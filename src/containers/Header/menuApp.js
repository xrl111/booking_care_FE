export const adminMenu = [
    {
        //quản lý admin
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud',
                link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor',
                link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                //quản lý kế hoạch bác sĩ

                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
        ],
    },
    {
        //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.create-clinic',
                link: '/system/create-clinic',
            },
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic',
            },
        ],
    },
    {
        //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.create-specialty',
                link: '/system/create-specialty',
            },
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty',
            },
        ],
    },
];

export const doctorMenu = [
    {
        //quản lý bác sĩ
        name: 'menu.admin.manage-user',
        menus: [
            {
                //quản lý kế hoạch bác sĩ
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
            {
                //quản lý lịch hẹn của  bác sĩ
                name: 'menu.doctor.manage-patient',
                link: '/doctor/manage-patient',
            },
            {
                //quản lý lịch hẹn của  bác sĩ
                name: 'menu.doctor.manage-history',
                link: '/doctor/manage-history',
            },
        ],
    },
];
