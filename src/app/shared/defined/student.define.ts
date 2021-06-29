export interface Student {
    student_id: string,
    student_name: string,
    student_address: string,
    student_email: string,
    student_numphone: string,
    student_birthday: string,
    student_avatar: string
};

export interface StudentUpdate {
    student_address: string,
    student_email: string,
    student_id: string,
    student_name: string
    student_numphone: string
}

export interface SelectAttendance {
    subject_id: string;
    class_id: string;
}

export type InputValue = string | number;


export interface IStudentTakeLeave {
    student_id: string;
    student_name: string;
    student_avatar: string;
    student_gender: number;
    class_id: string;
    subject_id: string;
    subject_name: string;
    is_enable: string;
    leave_time: string;
    take_leave_date: string;
    leave_reason: string;
    leave_id_leaves: string;
    leave_id_list_leave: string | null;
}


export interface ILeaveApplication{
    denine_reason: string;
    isDelete: number;
    is_enable: number;
    leave_id_leaves: string;
    leave_id_list_leave: string;
    leave_reason: string;
    leave_time: string;
    list_leave_id: string | null;
    student_name: string;
    subject_name: string;
    take_leave_date: string;
}