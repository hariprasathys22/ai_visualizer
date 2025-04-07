import React from "react";
import { motion } from "framer-motion";

export interface VectorContent {
  datas: VectorContentId[];
}

export interface VectorContentId {
  id?: string;
  payload: object;
}

const VectorContent: React.FC<any> = ({ datas, changeCategory }) => {
  // Filter the data based on the selected category
  const newData =
    changeCategory === "All"
      ? datas
      : datas.filter((data: any) => changeCategory === data.payload.category);

  return (
    <div className="w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newData.map((data: any, index: number) => (
        <motion.div
          key={index}
          className="bg-gray-50 border-l-4 border-blue-500 rounded-lg shadow-sm transition-all hover:shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="p-4">
            <div className="mb-2">
              <h3 className="text-lg font-bold text-gray-700">
                {data.id ? data.id : `Vector ${index + 1}`}
              </h3>
            </div>
            <div className="text-sm text-gray-600">
              {Object.entries(data.payload).map(([key, value], i) => (
                <div
                  key={i}
                  className="flex justify-between py-1 border-b last:border-b-0"
                >
                  <span className="font-semibold">{key}</span>
                  <span className="text-gray-800">{String(value)}</span>
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
