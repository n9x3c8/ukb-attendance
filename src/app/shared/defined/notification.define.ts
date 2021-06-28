export interface Notification {
    class_id: string;
    denine_reason: string;
    is_seen: string;
    is_enable: string;
    leave_id: string;
    leave_date: string;
    list_leave_id: string;
    student_id: string;
    student_name: string;
    subject_name: string;
    teacher_name: string;
}

export interface Inofification {
    denine_reason: string;
    is_seen: string;
    leave_date: string;
    leave_id: string;
    leave_reason: string;
    list_leave_id: string;
    subject_id: string;
    subject_name: string;
    teacher_name: string;
}

export interface IAlert {
    agreeHandle: Function;
}