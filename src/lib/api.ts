
// This file re-exports all API functions from domain-specific files
import { createUser, getUserByEmail } from './api/user';
import { createDonor, getDonorById, getAvailableDonorsByBloodTypeAndCity, updateDonorAvailability, getAllDonors } from './api/donor';
import { createPatient, getPatientById, updatePatientStatus, getAllPatients } from './api/patient';
import { createMatch, getAllMatches } from './api/match';
import { createNgoRegistration, getAllNgoRegistrations, updateNgoRegistrationStatus } from './api/ngo';
import { createHospitalRegistration, getAllHospitalRegistrations, updateHospitalRegistrationStatus } from './api/hospital';
import { checkAdminCredentials } from './api/admin';

// Re-export all functions
export {
  // User functions
  createUser,
  getUserByEmail,
  
  // Donor functions
  createDonor,
  getDonorById,
  getAvailableDonorsByBloodTypeAndCity,
  updateDonorAvailability,
  getAllDonors,
  
  // Patient functions
  createPatient,
  getPatientById,
  updatePatientStatus,
  getAllPatients,
  
  // Donation Match functions
  createMatch,
  getAllMatches,
  
  // NGO Registration functions
  createNgoRegistration,
  getAllNgoRegistrations,
  updateNgoRegistrationStatus,
  
  // Hospital Registration functions
  createHospitalRegistration,
  getAllHospitalRegistrations,
  updateHospitalRegistrationStatus,
  
  // Admin functions
  checkAdminCredentials
};
