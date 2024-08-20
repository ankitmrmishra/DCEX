import { motion } from 'framer-motion';

const DashboardSkeleton = () => {
  return (
    <div className="p-6  mx-auto bg-white w-[40rem]  rounded-xl shadow-md space-y-4">
      <motion.div
        className="flex items-center space-x-4"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </motion.div>
      
      <motion.div
        className="flex space-x-4"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-16 h-6 bg-gray-200 rounded" />
        <div className="w-16 h-6 bg-gray-200 rounded" />
        <div className="w-16 h-6 bg-gray-200 rounded" />
        <div className="w-16 h-6 bg-gray-200 rounded" />
      </motion.div>
      
      <motion.div
        className="h-10 bg-gray-200 rounded w-full"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      <motion.div
        className="space-y-3"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="h-8 bg-gray-200 rounded w-full" />
        <div className="h-8 bg-gray-200 rounded w-full" />
        <div className="h-8 bg-gray-200 rounded w-full" />
      </motion.div>
    </div>
  );
};

export default DashboardSkeleton;
