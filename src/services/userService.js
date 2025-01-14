import axios from '../axios';
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
};

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        },
    });
};

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data);
};

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`);
};
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const getAllDetailSpecialtyByIdForManageSpecialty = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id-for-management?id=${data}`);
};

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);
};

const getAllClinics = () => {
    return axios.get('/api/get-clinic');
};
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const getAllDetailClinicByIdForManageClinic = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data}`);
};
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

const getAllHistoryForDoctor = (data) => {
    return axios.get(`/api/get-list-history-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctorService,
    getDetailInfoDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById,
    createNewClinic,
    getAllClinics,
    getAllDetailClinicById,
    getAllDetailClinicByIdForManageClinic,
    getAllPatientForDoctor,
    postSendRemedy,
    getAllDetailSpecialtyByIdForManageSpecialty,
    getAllHistoryForDoctor,
};
