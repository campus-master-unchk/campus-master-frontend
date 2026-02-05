import { User } from "./userType"
import { Announcement } from "./announcement"

export interface Analytics {
    'total_students': number,
    'total_teachers': number,
    'total_modules': number,
    'total_courses': number,
    //recent users
    'recent_users': User[],
    //recent announcements
    'recent_announcements': Announcement[],

}