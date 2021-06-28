export interface Istatistical {
    class_id: string;
    teacher_id: string;
    class_name: string;
    learn_session: string;
    year: string | number;
    subject_id: string;
    subject_name: string;
    subject_credit: string;
    month: string;
}

export interface IstatisticalStudent {
    learn_session: string;
    leave_session: string;
    subject_credit: string | number;
    subject_id: string;
    subject_name: string;
    teacher_name: string;
}

