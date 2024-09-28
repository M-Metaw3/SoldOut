// import React, { useEffect, useState } from 'react';
// import { getAuctions, updateCooldown, removeCooldown } from '../api';

// const AuctionTable = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [selectedAuctionId, setSelectedAuctionId] = useState('');
//   const [newCooldown, setNewCooldown] = useState('');

//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         const data = await getAuctions();
//         setAuctions(data);
//       } catch (error) {
//         console.error('Error fetching auctions:', error);
//       }
//     };

//     fetchAuctions();
//   }, []);
//   const handleUpdateCooldown = async () => {
//     try {
//       await updateCooldown(selectedAuctionId, Number(newCooldown));
//       alert('Cooldown updated successfully');
//       setNewCooldown('');
//       setSelectedAuctionId('');
//       // Refresh the auctions list
//       const data = await getAuctions();
//       setAuctions(data);
//     } catch (error) {
//       console.error('Error updating cooldown:', error);
//     }
//   };

//   const handleRemoveCooldown = async (auctionId) => {
//     try {
//       await removeCooldown(auctionId);
//       alert('Cooldown removed successfully');
//       // Refresh the auctions list
//       const data = await getAuctions();
//       setAuctions(data);
//     } catch (error) {
//       console.error('Error removing cooldown:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Auctions</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Cooldown</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {auctions.map(auction => (
//             <tr key={auction.id}>
//               <td>{auction.id}</td>
//               <td>{auction.name}</td>
//               <td>{auction.cooldown || 'None'}</td>
//               <td>
//                 <button onClick={() => handleRemoveCooldown(auction.id)}>Remove Cooldown</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div>
//         <h2>Update Cooldown</h2>
//         <input
//           type="text"
//           placeholder="Auction ID"
//           value={selectedAuctionId}
//           onChange={e => setSelectedAuctionId(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="New Cooldown"
//           value={newCooldown}
//           onChange={e => setNewCooldown(e.target.value)}
//         />
//         <button onClick={handleUpdateCooldown}>Update Cooldown</button>
//       </div>
//     </div>
//   );
// };

// export default AuctionTable;








// import React, { useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
// import { getAuctions, updateCooldown, removeCooldown } from '../api';

// const AuctionTable = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   const { data: auctions = [], error, isLoading } = useQuery('auctions', getAuctions);
// console.log(auctions)
//   const updateCooldownMutation = useMutation(
//     ({ auctionId, cooldown }) => updateCooldown(auctionId, cooldown),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown updated.',
//           description: "The auction's cooldown has been updated.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error updating cooldown.',
//           description: 'There was an error updating the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const removeCooldownMutation = useMutation(
//     (auctionId) => removeCooldown(auctionId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown removed.',
//           description: "The auction's cooldown has been removed.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error removing cooldown.',
//           description: 'There was an error removing the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const handleUpdateCooldown = (auctionId, cooldown) => {
//     updateCooldownMutation.mutate({ auctionId, cooldown });
//   };

//   const handleRemoveCooldown = (auctionId) => {
//     removeCooldownMutation.mutate(auctionId);
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading auctions: {error.message}</p>;

//   return (
//     <Box p={5}>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th>ID</Th>
//             <Th>Name</Th>
//             <Th>Cooldown</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {auctions.map(auction => (
//             <Tr key={auction.id}>
//               <Td>{auction.id}</Td>
//               <Td>{auction.name}</Td>
//               <Td>{auction.cooldown || 'None'}</Td>
//               <Td>
//                 <Button
//                   colorScheme="red"
//                   onClick={() => handleRemoveCooldown(auction.id)}
//                   mr={2}
//                 >
//                   Remove Cooldown
//                 </Button>
//                 <Button
//                   colorScheme="blue"
//                   onClick={() => handleUpdateCooldown(auction.id, 5)} // Example default cooldown value
//                 >
//                   Set Cooldown to 5
//                 </Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

// export default AuctionTable;


// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import {
//   Box,
//   Button,
//   Input,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   useToast,
//   VStack,
//   Flex,
//   Heading,
//   Text,
// } from '@chakra-ui/react';
// import { getAuctions, updateCooldown, removeCooldown } from '../api';

// const AuctionTable = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   const { data: auctions = [], error, isLoading } = useQuery('auctions', getAuctions);

//   const updateCooldownMutation = useMutation(
//     ({ auctionId, cooldown }) => updateCooldown(auctionId, cooldown),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown updated.',
//           description: "The auction's cooldown has been updated.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error updating cooldown.',
//           description: 'There was an error updating the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const removeCooldownMutation = useMutation(
//     (auctionId) => removeCooldown(auctionId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown removed.',
//           description: "The auction's cooldown has been removed.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error removing cooldown.',
//           description: 'There was an error removing the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const [cooldownInput, setCooldownInput] = useState({});

//   const handleUpdateCooldown = (auctionId) => {
//     const cooldown = cooldownInput[auctionId] || 0;
//     updateCooldownMutation.mutate({ auctionId, cooldown });
//   };

//   const handleRemoveCooldown = (auctionId) => {
//     removeCooldownMutation.mutate(auctionId);
//   };

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading auctions: {error.message}</Text>;

//   return (
//     <Box p={5}>
//       <Heading mb={4}>Auctions</Heading>
//       <Table variant="simple" colorScheme="teal">
//         <Thead>
//           <Tr>
//             <Th>ID</Th>
//             <Th>Name</Th>
//             <Th>Cooldown</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {auctions.map(auction => (
//             <Tr key={auction.id}>
//               <Td>{auction.id}</Td>
//               <Td>{auction.name}</Td>
//               <Td>
//                 {auction.cooldown !== undefined ? (
//                   <Text>{auction.cooldown}</Text>
//                 ) : (
//                   <Text color="gray.500">None</Text>
//                 )}
//               </Td>
//               <Td>
//                 <Flex direction="row" gap={2}>
//                   {auction.cooldown !== undefined && (
//                     <Button
//                       colorScheme="red"
//                       onClick={() => handleRemoveCooldown(auction.id)}
//                     >
//                       Remove Cooldown
//                     </Button>
//                   )}
//                   <Input
//                     type="number"
//                     placeholder="Set Cooldown"
//                     value={cooldownInput[auction.id] || ''}
//                     onChange={(e) => setCooldownInput({
//                       ...cooldownInput,
//                       [auction.id]: e.target.value,
//                     })}
//                     size="sm"
//                     maxWidth="150px"
//                   />
//                   <Button
//                     colorScheme="blue"
//                     onClick={() => handleUpdateCooldown(auction.id)}
//                   >
//                     Update Cooldown
//                   </Button>
//                 </Flex>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

// export default AuctionTable;







// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import {
//   Box,
//   Button,
//   Input,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   useToast,
//   Flex,
//   Heading,
//   Text,
// } from '@chakra-ui/react';
// import { getAuctions, updateCooldown, removeCooldown } from '../api';

// const AuctionTable = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   const { data: auctions = [], error, isLoading } = useQuery('auctions', getAuctions);

//   const updateCooldownMutation = useMutation(
//     ({ auctionId, cooldown }) => updateCooldown(auctionId, cooldown),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown updated.',
//           description: "The auction's cooldown has been updated.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error updating cooldown.',
//           description: 'There was an error updating the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const removeCooldownMutation = useMutation(
//     (auctionId) => removeCooldown(auctionId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown removed.',
//           description: "The auction's cooldown has been removed.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error removing cooldown.',
//           description: 'There was an error removing the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const [cooldownInput, setCooldownInput] = useState({});

//   const handleUpdateCooldown = (auctionId) => {
//     const cooldown = Number(cooldownInput[auctionId]); // Convert to number
//     if (isNaN(cooldown) || cooldown < 0) {
//       toast({
//         title: 'Invalid input.',
//         description: 'Please enter a valid non-negative number for cooldown.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }
//     updateCooldownMutation.mutate({ auctionId, cooldown });
//   };

//   const handleRemoveCooldown = (auctionId) => {
//     removeCooldownMutation.mutate(auctionId);
//   };

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading auctions: {error.message}</Text>;

//   return (
//     <Box p={5}>
//       <Heading mb={4}> Sold Out Running Auctions</Heading>
//       <Table variant="simple" colorScheme="teal">
//         <Thead>
//           <Tr>
//             <Th>ID</Th>
//             {/* <Th>totalbids</Th> */}
//             <Th>Cooldown</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {auctions.map(auction => (
//             <Tr key={auction.id}>
//               <Td>{auction.id}</Td>
//               {/* <Td>{auction.total_bids}</Td> */}
//               <Td>
//                 {auction.cooldown !== undefined ? (
//                   <Text>{auction.cooldown}</Text>
//                 ) : (
//                   <Text color="gray.500">None</Text>
//                 )}
//               </Td>
//               <Td>
//                 <Flex direction="row" gap={2}>
//                   {auction.cooldown !== undefined && (
//                     <Button
//                       colorScheme="red"
//                       onClick={() => handleRemoveCooldown(auction.id)}
//                     >
//                       Remove Cooldown
//                     </Button>
//                   )}
//                   <Input
//                     type="number"
//                     placeholder="Set Cooldown"
//                     value={cooldownInput[auction.id] || ''}
//                     onChange={(e) => setCooldownInput({
//                       ...cooldownInput,
//                       [auction.id]: e.target.value,
//                     })}
//                     size="sm"
//                     maxWidth="150px"
//                   />
//                   <Button
//                     colorScheme="blue"
//                     onClick={() => handleUpdateCooldown(auction.id)}
//                   >
//                     Update Cooldown
//                   </Button>
//                 </Flex>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

// export default AuctionTable;









// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import {
//   Box,
//   Button,
//   Input,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   useToast,
//   Flex,
//   Heading,
//   Text,
//   Select,
// } from '@chakra-ui/react';
// import { getAuctions, updateCooldown, removeCooldown, setWinner } from '../api'; // Assuming setWinner is your API function

// const AuctionTable = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   const { data: auctions = [], error, isLoading } = useQuery('auctions', getAuctions);

//   const updateCooldownMutation = useMutation(
//     ({ auctionId, cooldown }) => updateCooldown(auctionId, cooldown),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown updated.',
//           description: "The auction's cooldown has been updated.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error updating cooldown.',
//           description: 'There was an error updating the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const removeCooldownMutation = useMutation(
//     (auctionId) => removeCooldown(auctionId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown removed.',
//           description: "The auction's cooldown has been removed.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error removing cooldown.',
//           description: 'There was an error removing the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const setWinnerMutation = useMutation(
//     ({ auctionId, userId, userName }) => setWinner(auctionId, userId, userName), // Assuming setWinner is an API function
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Winner updated.',
//           description: "The auction's winner has been updated.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error setting winner.',
//           description: 'There was an error setting the winner.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const [cooldownInput, setCooldownInput] = useState({});
//   const [selectedUser, setSelectedUser] = useState({}); // Track selected users for each auction

//   const handleUpdateCooldown = (auctionId) => {
//     const cooldown = Number(cooldownInput[auctionId]); // Convert to number
//     if (isNaN(cooldown) || cooldown < 0) {
//       toast({
//         title: 'Invalid input.',
//         description: 'Please enter a valid non-negative number for cooldown.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }
//     updateCooldownMutation.mutate({ auctionId, cooldown });
//   };

//   const handleRemoveCooldown = (auctionId) => {
//     removeCooldownMutation.mutate(auctionId);
//   };

//   const handleSetWinner = (auctionId, userId, userName) => {
//     setWinnerMutation.mutate({ auctionId, userId, userName });
//   };

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading auctions: {error.message}</Text>;

//   return (
//     <Box p={5}>
//       <Heading mb={4}> Sold Out Running Auctions</Heading>
//       <Table variant="simple" colorScheme="teal">
//         <Thead>
//           <Tr>
//             <Th>ID</Th>
//             <Th>Cooldown</Th>
//             <Th>Users</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {auctions.map((auction) => (
//             <Tr key={auction.id}>
//               <Td>{auction.id}</Td>
//               <Td>
//                 {auction.cooldown !== undefined ? (
//                   <Text>{auction.cooldown}</Text>
//                 ) : (
//                   <Text color="gray.500">None</Text>
//                 )}
//               </Td>
//               <Td>
//                 {/* Select a user as the winner */}
//                 {auction.users.length > 0 ? (
//                   <Select
//                   color={'black'}
//                     placeholder="Select user"
//                     value={selectedUser[auction.id] || ''}
//                     onChange={(e) =>
//                       setSelectedUser({
//                         ...selectedUser,
//                         [auction.id]: e.target.value,
//                       })
//                     }
//                   >
//                     {auction.users.map((user) => (
//                       <option key={user.user_id} value={user.user_id}>
//                         {user.user_name}
//                       </option>
//                     ))}
//                   </Select>
//                 ) : (
//                   <Text color="gray.500">No users available</Text>
//                 )}
//               </Td>
//               <Td>
//                 <Flex direction="row" gap={2}>
//                   {auction.cooldown !== undefined && (
//                     <Button
//                       colorScheme="red"
//                       onClick={() => handleRemoveCooldown(auction.id)}
//                     >
//                       Remove Cooldown
//                     </Button>
//                   )}
//                   <Input
//                     type="number"
//                     placeholder="Set Cooldown"
//                     value={cooldownInput[auction.id] || ''}
//                     onChange={(e) =>
//                       setCooldownInput({
//                         ...cooldownInput,
//                         [auction.id]: e.target.value,
//                       })
//                     }
//                     size="sm"
//                     maxWidth="150px"
//                   />
//                   <Button
//                     colorScheme="blue"
//                     onClick={() => handleUpdateCooldown(auction.id)}
//                   >
//                     Update Cooldown
//                   </Button>
//                   <Button
//                     colorScheme="green"
//                     onClick={() =>
//                       handleSetWinner(
//                         auction.id,
//                         selectedUser[auction.id],
//                         auction.users.find(
//                           (user) => user.user_id === selectedUser[auction.id]
//                         )?.user_name
//                       )
//                     }
//                     isDisabled={!selectedUser[auction.id]}
//                   >
//                     Set Winner
//                   </Button>
//                 </Flex>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

// export default AuctionTable;









// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import {
//   Box,
//   Button,
//   Input,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   useToast,
//   Flex,
//   Heading,
//   Text,
//   Select,
// } from '@chakra-ui/react';
// import { getAuctions, updateCooldown, removeCooldown, setWinner, removeWinner } from '../api'; // Assume these API functions are available

// const AuctionTable = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   // Fetch auctions from API
//   const { data: auctions = [], error, isLoading } = useQuery('auctions', getAuctions);

//   // Mutation for updating cooldown
//   const updateCooldownMutation = useMutation(
//     ({ auctionId, cooldown }) => updateCooldown(auctionId, cooldown),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown updated.',
//           description: "The auction's cooldown has been updated.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error updating cooldown.',
//           description: 'There was an error updating the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   // Mutation for removing cooldown
//   const removeCooldownMutation = useMutation(
//     (auctionId) => removeCooldown(auctionId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Cooldown removed.',
//           description: "The auction's cooldown has been removed.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error removing cooldown.',
//           description: 'There was an error removing the cooldown.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   // Mutation for setting winner
//   const setWinnerMutation = useMutation(
//     ({ auctionId, userId, userName }) => setWinner(auctionId, userId, userName),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Winner updated.',
//           description: "The auction's winner has been updated.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error setting winner.',
//           description: 'There was an error setting the winner.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   // Mutation for removing winner
//   const removeWinnerMutation = useMutation(
//     (auctionId) => removeWinner(auctionId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('auctions');
//         toast({
//           title: 'Winner removed.',
//           description: "The auction's winner has been removed.",
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//       onError: () => {
//         toast({
//           title: 'Error removing winner.',
//           description: 'There was an error removing the winner.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       },
//     }
//   );

//   const [cooldownInput, setCooldownInput] = useState({});
//   const [selectedUser, setSelectedUser] = useState({}); // Track selected users for each auction

//   // Update cooldown handler
//   const handleUpdateCooldown = (auctionId) => {
//     const cooldown = Number(cooldownInput[auctionId]); // Convert to number
//     if (isNaN(cooldown) || cooldown < 0) {
//       toast({
//         title: 'Invalid input.',
//         description: 'Please enter a valid non-negative number for cooldown.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }
//     updateCooldownMutation.mutate({ auctionId, cooldown });
//   };

//   // Remove cooldown handler
//   const handleRemoveCooldown = (auctionId) => {
//     removeCooldownMutation.mutate(auctionId);
//   };

//   // Set winner handler
//   const handleSetWinner = (auctionId, userId, userName) => {
//     setWinnerMutation.mutate({ auctionId, userId, userName });
//   };

//   // Remove winner handler
//   const handleRemoveWinner = (auctionId) => {
//     removeWinnerMutation.mutate(auctionId);
//   };

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading auctions: {error.message}</Text>;

//   return (
//     <Box p={5}>
//       <Heading mb={4}>Running Auctions</Heading>
//       <Table variant="simple" colorScheme="teal">
//         <Thead>
//           <Tr>
//             <Th>ID</Th>
//             <Th>Cooldown</Th>
//             <Th>Users</Th>
//             <Th>Winner</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {auctions.map((auction) => (
//             <Tr key={auction.id}>
//               <Td>{auction.id}</Td>
//               <Td>
//                 {auction.cooldown !== undefined ? (
//                   <Text>{auction.cooldown}</Text>
//                 ) : (
//                   <Text color="gray.500">None</Text>
//                 )}
//               </Td>
//               <Td>
//                 {auction.users.length > 0 ? (
//                   <Select
//                   color={'black'}
                  
//                     placeholder="Select user"
//                     value={selectedUser[auction.id] || ''}
//                     onChange={(e) =>
//                       setSelectedUser({
//                         ...selectedUser,
//                         [auction.id]: e.target.value,
//                       })
//                     }
//                   >
//                     {auction.users.map((user) => (
//                       <option key={user.user_id} value={user.user_id}>
//                         {user.user_name}
//                       </option>
//                     ))}
//                   </Select>
//                 ) : (
//                   <Text color="gray.500">No users available</Text>
//                 )}
//               </Td>
//               <Td>
//                 {auction.userwinnerid ? (
//                   <Text>{`Winner: ${auction.userwinnerid}`}</Text>
//                 ) : (
//                   <Text color="gray.500">No winner selected</Text>
//                 )}
//               </Td>
//               <Td>
//                 <Flex direction="row" gap={2}>
//                   <Button
//                     colorScheme="green"
//                     onClick={() =>
//                       handleSetWinner(
//                         auction.id,
//                         selectedUser[auction.id],
//                         auction.users.find(
//                           (user) => user.user_id === selectedUser[auction.id]
//                         )?.user_name
//                       )
//                     }
//                     isDisabled={!selectedUser[auction.id]}
//                   >
//                     Set Winner
//                   </Button>
//                   {auction.userwinnerid && (
//                     <Button
//                       colorScheme="red"
//                       onClick={() => handleRemoveWinner(auction.id)}
//                     >
//                       Remove Winner
//                     </Button>
//                   )}
//                   <Input
//                     type="number"
//                     placeholder="Set Cooldown"
//                     value={cooldownInput[auction.id] || ''}
//                     onChange={(e) =>
//                       setCooldownInput({
//                         ...cooldownInput,
//                         [auction.id]: e.target.value,
//                       })
//                     }
//                     size="sm"
//                     maxWidth="150px"
//                   />
//                   <Button
//                     colorScheme="blue"
//                     onClick={() => handleUpdateCooldown(auction.id)}
//                   >
//                     Update Cooldown
//                   </Button>
//                   {auction.cooldown !== undefined && (
//                     <Button
//                       colorScheme="red"
//                       onClick={() => handleRemoveCooldown(auction.id)}
//                     >
//                       Remove Cooldown
//                     </Button>
//                   )}
//                 </Flex>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

// export default AuctionTable;















import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Flex,
  Heading,
  Text,
  Select,
} from '@chakra-ui/react';
import { getAuctions, updateCooldown, removeCooldown, setWinner, removeWinner } from '../api'; // Assume these API functions are available

const AuctionTable = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Fetch auctions from API
  const { data: auctions = [], error, isLoading } = useQuery('auctions', getAuctions);

  // Mutation for updating cooldown
  const updateCooldownMutation = useMutation(
    ({ auctionId, cooldown }) => updateCooldown(auctionId, cooldown),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('auctions');
        toast({
          title: 'Cooldown updated.',
          description: "The auction's cooldown has been updated.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Error updating cooldown.',
          description: 'There was an error updating the cooldown.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  // Mutation for removing cooldown
  const removeCooldownMutation = useMutation(
    (auctionId) => removeCooldown(auctionId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('auctions');
        toast({
          title: 'Cooldown removed.',
          description: "The auction's cooldown has been removed.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Error removing cooldown.',
          description: 'There was an error removing the cooldown.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  // Mutation for setting winner
  const setWinnerMutation = useMutation(
    ({ auctionId, userId, userName }) => setWinner(auctionId, userId, userName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('auctions');
        toast({
          title: 'Winner updated.',
          description: "The auction's winner has been updated.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Error setting winner.',
          description: 'There was an error setting the winner.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  // Mutation for removing winner
  const removeWinnerMutation = useMutation(
    (auctionId) => removeWinner(auctionId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('auctions');
        toast({
          title: 'Winner removed.',
          description: "The auction's winner has been removed.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Error removing winner.',
          description: 'There was an error removing the winner.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const [cooldownInput, setCooldownInput] = useState({});
  const [selectedUser, setSelectedUser] = useState({}); // Track selected users for each auction

  // Update cooldown handler
  const handleUpdateCooldown = (auctionId) => {
    const cooldown = Number(cooldownInput[auctionId]); // Convert to number
    if (isNaN(cooldown) || cooldown < 0) {
      toast({
        title: 'Invalid input.',
        description: 'Please enter a valid non-negative number for cooldown.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    updateCooldownMutation.mutate({ auctionId, cooldown });
  };

  // Remove cooldown handler
  const handleRemoveCooldown = (auctionId) => {
    removeCooldownMutation.mutate(auctionId);
  };

  // Set winner handler
  const handleSetWinner = (auctionId, userId, userName) => {
    setWinnerMutation.mutate({ auctionId, userId, userName });
  };

  // Remove winner handler
  const handleRemoveWinner = (auctionId) => {
    removeWinnerMutation.mutate(auctionId);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading auctions: {error.message}</Text>;

  return (
    <Box p={5}>
      <Heading mb={4}>Running Auctions</Heading>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Cooldown</Th>
            <Th>Users</Th>
            <Th>Winner</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {auctions.map((auction) => (
            <Tr key={auction.id}>
              <Td>{auction.id}</Td>
              <Td>
                {auction.cooldown !== undefined ? (
                  <Text>{auction.cooldown}</Text>
                ) : (
                  <Text color="gray.500">None</Text>
                )}
              </Td>
              <Td>
                {auction.users.length > 0 ? (
                  <Select
                    color={'black'}
                    placeholder="Select user"
                    value={selectedUser[auction.id] || ''}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        [auction.id]: e.target.value,
                      })
                    }
                  >
                    {auction.users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.user_name}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Text color="gray.500">No users available</Text>
                )}
              </Td>
              <Td>
                {auction.userwinnerid ? (
                  <>
                  <Text color={'yellow'}>{`Winnerid: ${auction?.userwinnerid}`}</Text>
                  <Text color={'yellow'}>{`WinnerName: ${auction?.user_winner_name}`}</Text>
                  </>
                ) : (
                  <Text color="gray.500">No winner selected</Text>
                )}
              </Td>
              <Td>
                <Flex direction="row" gap={2}>
                <Button
  colorScheme="green"
  onClick={() => {
    const selectedUserId = selectedUser[auction.id];
    const foundUser = auction.users.find((user) => user.id === selectedUserId);
    console.log("Selected User ID:", selectedUserId); // Log selected user ID
    console.log("Found User Object:", foundUser); // Log the user object found in auction.users

    if (foundUser) {
      handleSetWinner(auction.id, selectedUserId, foundUser.user_name);
    } else {
      console.error("No user found with the selected user ID");
    }
  }}
  isDisabled={!selectedUser[auction.id]}
>
  Set Winner
</Button>

                  {auction.userwinnerid && (
                    <Button
                      colorScheme="red"
                      onClick={() => handleRemoveWinner(auction.id)}
                    >
                      Remove Winner
                    </Button>
                  )}
                  <Input
                    type="number"
                    placeholder="Set Cooldown"
                    value={cooldownInput[auction.id] || ''}
                    onChange={(e) =>
                      setCooldownInput({
                        ...cooldownInput,
                        [auction.id]: e.target.value,
                      })
                    }
                    size="sm"
                    maxWidth="150px"
                  />
                  <Button
                    colorScheme="blue"
                    onClick={() => handleUpdateCooldown(auction.id)}
                  >
                    Update Cooldown
                  </Button>
                  {auction.cooldown !== undefined && (
                    <Button
                      colorScheme="red"
                      onClick={() => handleRemoveCooldown(auction.id)}
                    >
                      Remove Cooldown
                    </Button>
                  )}
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AuctionTable;









