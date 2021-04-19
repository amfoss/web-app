import React from 'react';
import {
  DashboardOutlined,
  DeploymentUnitOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  FormOutlined,
  GlobalOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

export const links = [
  {
    title: 'Dashboard',
    key: '/',
    icon: <DashboardOutlined />,
  },
  {
    title: 'Attendance',
    key: 'attendance',
    icon: <DeploymentUnitOutlined />,
    items: [
      {
        key: 'dashboard',
        title: 'Dashboard',
      },
      // {
      //   key: 'individual-report',
      //   title: 'Individual Report',
      // },
      {
        key: 'live-report',
        title: 'Live Attendance',
      },
      {
        key: 'daily-report',
        title: 'Daily Report',
      },
      {
        key: 'stats',
        title: 'Stats',
      },
    ],
  },
  {
    title: 'Status Updates',
    key: 'status-updates',
    icon: <ScheduleOutlined />,
    items: [
      {
        key: 'dashboard',
        title: 'Dashboard',
      },
      {
        key: 'individual-report',
        title: 'Individual Report',
      },
      {
        key: 'daily-report',
        title: 'Daily Report',
      },
      {
        key: 'messages',
        title: 'Messages',
      },
      {
        key: 'stats',
        title: 'Stats',
      },
    ],
  },
  {
    title: 'Calendar',
    key: 'calendar',
    icon: <CalendarOutlined />,
    items: [
      {
        key: 'create-event',
        title: 'Create Event',
      },
      {
        key: 'view-calendar',
        title: 'View Calendar',
      },
    ],
  },
  {
    title: 'Forms',
    key: 'forms',
    icon: <FormOutlined />,
    items: [
      {
        key: 'create-forms',
        title: 'Create Forms',
      },
      {
        key: 'view-forms',
        title: 'View Forms',
      },
    ],
  },
  {
    title: 'Blog',
    key: 'blog',
    icon: <ContainerOutlined />,
    items: [
      {
        key: 'create-blog',
        title: 'Create Blog',
      },
    ],
  },
  {
    title: 'Events',
    key: 'events',
    icon: <GlobalOutlined />,
    items: [
      {
        key: 'check-in',
        title: 'QR Scanner',
      },
    ],
  },
  {
    title: 'Account',
    key: 'account',
    icon: <UserOutlined />,
    items: [
      // {
      //   key: 'profile',
      //   title: 'My Profile',
      // },
      {
        key: 'settings',
        title: 'Settings',
      },
    ],
  },
  {
    title: 'Admin',
    key: 'admin',
    icon: <UserOutlined />,
    adminExclusive: true,
    items: [
      {
        key: 'manage-users',
        title: 'Manage Users',
      },
    ],
  },
  // {
  //   title: 'Settings',
  //   key: 'settings',
  //   icon: <SettingOutlined />,
  //   items: [
  //     {
  //       key: 'general',
  //       title: 'General Settings',
  //     },
  //     {
  //       key: 'privacy',
  //       title: 'Privacy',
  //     },
  //     {
  //       key: 'appearance',
  //       title: 'Appearance',
  //     },
  //     {
  //       key: 'notifications',
  //       title: 'Notifications',
  //     },
  //   ],
  // },
  {
    title: 'Logout',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];
