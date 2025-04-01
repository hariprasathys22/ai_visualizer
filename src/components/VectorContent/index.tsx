import type React from "react";
import { motion } from "framer-motion";

export interface VectorContentProps {
  datas: VectorContentId[];
  changeCategory: string;
}

export interface VectorContentId {
  id?: string;
  payload: { [key: string]: any };
}

const VectorContent: React.FC<VectorContentProps> = ({ datas, changeCategory }) => {
  const newData =
    changeCategory === "All"
      ? datas
      : datas.filter((data) => changeCategory === data.payload.category);

  return (
    // Outer container with overflow-y-auto enables vertical scrolling.
    <div className="w-full h-full max-h-screen p-6 overflow-y-auto">
      {/* Inner grid container for better layout control */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newData.map((data, index) => (
          <motion.div
            key={data.id || index}
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
                    <span className="text-gray-800 bg-gray-100 px-2 py-1 rounded-sm text-sm">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VectorContent;
