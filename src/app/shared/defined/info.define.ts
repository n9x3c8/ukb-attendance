export interface IinfoStateAT {
    attendance_id_last: number;
    count_number_session: string;
    timeserver: number;
    dateServer: string;
    infoClass: {
        class_id: string;
        class_name: string;
    };
    infoSubject: {
        subject_id: string;
        subject_name: string;
    };
}

export interface IinfoAT {
    class_id: string;
    class_name: string;
    subject_id: string;
    subject_name: string;
}


export interface IinfoTeacher {
    teacher_address: string;
    teacher_avatar: string;
    teacher_email: string;
    teacher_numphone: string;
    teacher_id: string;
    teacher_name: string;

}

export interface IStatusUpdateProfile {
    avatar_new: string;
    update_state_info: number,
    upload_state_avatar: string | number;
}

export interface Ipagination {
    currentPage?: number;
    length?: number
}