
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/button';
// import { MessageSquare, Settings } from 'lucide-react';

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <header className="bg-company-primary text-white p-4">
//         <div className="container mx-auto">
//           <h1 className="text-2xl font-bold">Comment Scribe Pro</h1>
//           <p className="text-sm opacity-80">Manage your predefined comments efficiently</p>
//         </div>
//       </header>
      
//       <main className="flex-1 container mx-auto py-8 px-4">
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <Settings className="mr-2 text-company-primary" size={20} />
//               User Preferences
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Customize your experience and manage your personal settings.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Link to="/comments" className="block">
//                 <div className="border rounded-lg p-4 hover:border-company-primary hover:bg-company-accent transition-colors">
//                   <div className="flex items-center mb-2">
//                     <MessageSquare className="mr-2 text-company-primary" size={18} />
//                     <h3 className="font-medium">Predefined Comments</h3>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     Create and manage your predefined comments for quick access.
//                   </p>
//                 </div>
//               </Link>
//               <div className="border rounded-lg p-4 hover:border-gray-300 transition-colors">
//                 <div className="flex items-center mb-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                   </svg>
//                   <h3 className="font-medium">Notification Settings</h3>
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Configure how and when you receive notifications.
//                 </p>
//               </div>
              
//               <div className="border rounded-lg p-4 hover:border-gray-300 transition-colors">
//                 <div className="flex items-center mb-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
//                   </svg>
//                   <h3 className="font-medium">Display Preferences</h3>
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Customize the appearance and layout of your interface.
//                 </p>
//               </div>
              
//               <div className="border rounded-lg p-4 hover:border-gray-300 transition-colors">
//                 <div className="flex items-center mb-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <h3 className="font-medium">Calendar Settings</h3>
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Set your working hours, time zone, and calendar preferences.
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="text-center mt-8">
//             <Link to="/comments">
//               <Button className="bg-company-primary hover:bg-blue-600">
//                 Go to Predefined Comments
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </main>
      
//       <footer className="bg-gray-100 border-t py-4">
//         <div className="container mx-auto px-4 text-center text-sm text-gray-500">
//           &copy; {new Date().getFullYear()} Comment Scribe Pro. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;
