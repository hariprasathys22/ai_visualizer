import type React from "react";
import { motion } from "framer-motion";

export interface VectorContent {
  datas: VectorContentId[];
}

export interface VectorContentId {
  id?: string;
  payload: object;
}

const VectorContent: React.FC<any> = ({ datas, changeCategory }) => {
  let newData;
    console.log(changeCategory, "change");
    
  if(changeCategory === "All"){
    newData = datas
  }else{
    newData = datas.filter((data: any) => changeCategory === data.payload.category)
    console.log(newData, "djhjhdjdj");
    
  }
  
  return (
    <div className="w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newData.map((data: any, index: number) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="p-6">
            <h3 className="font-bold text-xl mb-4 text-gray-800">
              {index + 1}
            </h3>
            <div className="space-y-3">
              {Object.entries(data.payload).map(([key, value], i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">{key}</span>
                  <span className="text-gray-800 bg-gray-100 px-2 py-1 rounded-[5px] text-sm">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VectorContent;
