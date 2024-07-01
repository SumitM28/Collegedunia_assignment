import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";
import { LuDownload } from "react-icons/lu";
import { CgArrowsExchangeV } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import collegeData from "../data/collegeData.json";
import { debounce } from 'lodash';

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("ascending");

  const fetchData = ()=>{
    let sortedData = [...collegeData]; 
    console.log(sortBy)
    if (sortBy === "ascending") {
      sortedData.sort((a, b) => (a.Rank > b.Rank ? 1 : -1)); 
    } else if (sortBy === "descending") {
      sortedData.sort((a, b) => (a.Rank < b.Rank ? 1 : -1)); 
    }else if(sortBy === "ratings"){
      sortedData.sort((a, b) => (a.User_Reviews.Rating < b.User_Reviews.Rating ? 1 : -1));
    }else if(sortBy === "reviews"){

      sortedData.sort((a, b) => {
        let positionA = parseInt(a.Ranking.Position.replace(/\D/g, ''), 10);
        let positionB = parseInt(b.Ranking.Position.replace(/\D/g, ''), 10);
        
        return positionA - positionB; 
      });
      
    }
    setColleges(sortedData.slice(0, page * 10));
  }

  useEffect(() => {
    fetchData()
  }, [page, sortBy]);

  const handleScroll = () => {
    console.log("Height:", document.documentElement.scrollHeight);
    console.log("Top:", document.documentElement.scrollTop);
    console.log("Window:", window.innerHeight);

    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleChangeDebounce = debounce((value) => {
    if(value ===""){
      fetchData();
    }else{
      const searchByCollegeName = collegeData.filter(college=>college.College===value);
      setColleges(searchByCollegeName);
    }
  }, 300);

  const handleInputChange  = (event) => {
    const value  = event.target.value;
    handleChangeDebounce(value)
  };

  return (
    <>
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center gap-2">
          <p className=" text-xl">Search By:</p>
          <input
            type="text"
            id="colleg"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-max"
            placeholder="Collge Name"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <p className=" text-xl">Sort By:</p>

          <select
            name=""
            id=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-max"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="ratings">Ratings</option>
            <option value="reviews">Reviews</option>
          </select>
        </div>
      </div>

      <table className=" border-collapse w-full border-2">
        <thead>
          <tr className="bg-[#78bec3] text-white font-normal text-left text-base">
            <th className="px-2 py-3 w-[7%]">CD Rank</th>
            <th className="px-2 py-3 w-[37%]">College</th>
            <th className="px-2 py-3 w-[14%]">Course Fees</th>
            <th className="px-2 py-3 w-[14%]">Placement</th>
            <th className="px-2 py-3 w-[14%]">User Reviews</th>
            <th className="px-2 py-3 w-[14%]">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college, index) => (
            <tr key={index}>
              <td className="p-2 align-top">#{college.Rank}</td>
              <td className="p-2 align-top relative">
                {college.featured && (
                  <div className="bg-[#ff284b] absolute left-5 top-[-5px] rounded-bl-full rounded-br-full">
                    <p className="text-white text-xs py-1 px-8">Featured</p>
                  </div>
                )}

                <div className={`flex gap-2 ${college.featured && "mt-3"}`}>
                  <img
                    src={college.logo}
                    alt="college_icon"
                    className=" rounded-full w-[30px] h-[30px]"
                  />

                  <div>
                    <h3 className="text-[#6bcfe9] text-base font-semibold">
                      {college.College}
                    </h3>
                    <div className="flex text-xs gap-1 text-[#a1a1a1] mt-1">
                      <p className="">{college.Location}</p> |{" "}
                      <p>AICTE Approved</p>
                    </div>

                    <div className=" w-max px-2 border-l-2 border-[#ff9542] bg-[#fffae1] rounded-r-md mt-3">
                      <div className="flex items-center text-sm text-[#ff9542] font-semibold">
                        <p>{college.Course}</p>
                        <RiArrowDownSLine size={15} />
                      </div>
                      <p className="text-sm">
                        JEE Advanced 2023 Cutoff:{" "}
                        {college.JEE_Advanced_2023_Cutoff}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3 mb-5">
                  <div className="text-[#ff9542] flex items-center gap-1 cursor-pointer">
                    <BsArrowRightShort size={20} />
                    <p className=" text-sm">Apply Now</p>
                  </div>
                  <div className="text-[#43c4a7] flex items-center gap-1 cursor-pointer">
                    <LuDownload size={15} />
                    <p className=" text-sm">Download Brochure</p>
                  </div>
                  <div className="text-[#4b4b4b] flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" name="" id="" />
                    <p className=" text-sm">Add To Compare</p>
                  </div>
                </div>
              </td>
              <td className="p-2 align-top">
                <div>
                  <h3 className="text-[#56cbb2] font-semibold text-base">
                    {college.Course_Fees}
                  </h3>

                  <p className="text-xs text-[#a1a1a1] mt-1">
                    {college.Course_Type}
                  </p>

                  <p className="text-xs text-[#a1a1a1] mt-1">
                    -{college.Course_Duration}
                  </p>

                  <button className="text-sm flex gap-1 items-center mt-2 text-[#ff9542] font-semibold">
                    <CgArrowsExchangeV size={15} className="rotate-90" />
                    <p>Compare Fess</p>
                  </button>
                </div>
              </td>
              <td className="p-2 align-top">
                <div>
                  <h3 className="text-[#56cbb2] font-semibold text-base">
                    {college.Placement.Average_Package}
                  </h3>

                  <p className="text-xs text-[#a1a1a1] ">Average Package</p>

                  <h3 className="text-[#56cbb2] font-semibold text-base">
                    {college.Placement.Highest_Package}
                  </h3>

                  <p className="text-xs text-[#a1a1a1] ">Highest Package</p>

                  <button className="text-sm flex gap-1 items-center mt-2 text-[#ff9542] font-semibold">
                    <CgArrowsExchangeV size={15} className="rotate-90" />
                    <p>Compare Placements</p>
                  </button>
                </div>
              </td>
              <td className="p-2 align-top">
                <div>
                  <div className="flex gap-1 items-center">
                    <div className="bg-[#ffa308] w-[10px] h-[10px] rounded-full" />
                    <p> {college.User_Reviews.Rating} / 10</p>
                  </div>
                </div>
                <p className="text-xs text-[#a1a1a1] ">
                  Based on {college.User_Reviews.Based_on} User Reviews
                </p>

                <div className="px-2 py-[2px] rounded-full w-max bg-[#fdf3dc] text-[#e7a6a8] flex items-center gap-1 text-xs mt-3">
                  <FaCheck size={10} />
                  <p>Best in {college.User_Reviews.Best_in}</p>
                  <RiArrowDownSLine size={15} />
                </div>
              </td>
              <td className="p-2 align-top">
                <div>
                  <p className="text-base">
                    {college.Ranking.Position}/
                    <span className="text-[#ff9542]">
                      {college.Ranking.Out_Of}
                    </span>{" "}
                    in {college.Ranking.location}
                  </p>

                  <div className="mt-1 flex gap-1 items-center ">
                    <img
                      src={college.Ranking.By}
                      alt=""
                      className="w-[50px] object-contain"
                    />
                    <p>{college.Ranking.Year}</p>
                  </div>

                  <div className=" w-max px-2 border-l-2 border-[#73d2f4] bg-[#e6faff] rounded-r-md mt-3">
                    <div className="flex items-center text-sm text-[#7dd4f4] font-semibold">
                      <div className="flex items-center">
                        <img
                          src="https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png"
                          alt="logo"
                          className="w-[15px] rounded-full "
                        />
                        <img
                          src="https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png"
                          alt="logo"
                          className="w-[15px] rounded-full ml-[-5px]"
                        />
                        <img
                          src="https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png"
                          alt="logo"
                          className="w-[15px] rounded-full ml-[-5px]"
                        />
                      </div>
                      <p>+{college.Ranking.More} More</p>
                      <RiArrowDownSLine size={15} />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CollegeTable;
