import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingABI from '../src/artifacts/contracts/Voting.sol/Voting.json';  // Import the ABI

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votingContract, setVotingContract] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";  // Replace with your contract address

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Request wallet access
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }

      // Initialize contract
      const contract = new ethers.Contract(contractAddress, VotingABI.abi, signer);
      setVotingContract(contract);

      // Load candidates from contract
      const candidatesCount = await contract.candidatesCount();
      let candidatesArray = [];
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.getCandidate(i);
        candidatesArray.push({
          id: candidate[0].toNumber(),
          name: candidate[1],
          voteCount: candidate[2].toNumber(),
        });
      }
      setCandidates(candidatesArray);
      setLoading(false);
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      setErrorMessage(`Failed to load data: ${error.message || error}`);
      setLoading(false);
    }
  };

  const vote = async (candidateId) => {
    if (!votingContract || !selectedCandidate) return;
    
    try {
      const transaction = await votingContract.vote(candidateId);
      await transaction.wait();
      setIsVoted(true); // Mark as voted after successful transaction
    } catch (error) {
      console.error("Error during voting:", error);
      alert(`Voting failed: ${error.message || error}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading candidates...</div>;
  }

  return (
    <div className="h-screen w-screen bg-blue-400 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-white font-bold mb-8">Vote for Your Favourite</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 md:w-1/2">
        {errorMessage && (
          <div className="text-red-500 mb-4">
            {errorMessage}
          </div>
        )}
        <ul className="space-y-4">
          {candidates.map((candidate) => (
            <li key={candidate.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="text-xl font-semibold">{candidate.name}</p>
                <p className="text-gray-500">{candidate.voteCount} votes</p>
              </div>
              <button 
                onClick={() => setSelectedCandidate(candidate.id)} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Vote
              </button>
            </li>
          ))}
        </ul>

        {selectedCandidate && !isVoted && (
          <button 
            onClick={() => vote(selectedCandidate)} 
            className="mt-8 w-full bg-green-500 text-white text-lg py-3 rounded hover:bg-green-600"
          >
            Confirm Vote
          </button>
        )}

        {isVoted && (
          <p className="mt-8 text-center text-green-600 text-lg font-semibold">
            Thanks for voting!
          </p>
        )}
      </div>
    </div>
  );
};

export default Voting;
