import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import RequireAuth from 'shared/components/auth-provider';
import AuthorizedRedirection from 'shared/components/authorized-redirection';
import {
  toAppointeecount,
  toAppointeeInvoice,
  toAttention,
  toCancelled,
  toCreateUser,
  toDashboard,
  toDataUploaded,
  toGeneralSetup,
  toLapseddata,
  toLinknotsent,
  toLogin,
  toForgotPassword,
  toManageProfile,
  toPFUsers,
  toProcessing,
  toRegister,
  toApiCountReport,
  toUpdateData,
  toUpdateUser,
  toUplodData,
  toUserlist,
  toVerified,
  toHelp,
  toSetPassword,
  toReSetPassword,
  toNoMovementAgingReport,
  toNoResponseAgingReport,
  toNationalityReport,
  toAppointeeReport,
  toUserLogin,
  topfPension,
  toMannualVerification,
  toReuploadDoc,
  toAadhaarSuccess,
  toAadhaarFailure,
  toPolicySetup,
} from 'shared/constants/constants';
import BlankLayoutWithHeader from 'shared/layouts/blank/BlankLayoutWithHeader';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from 'authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { PolicySetup } from '../../modules/policy-setup';
const msalInstance = new PublicClientApplication(msalConfig);
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Dashboard = Loadable(lazy(() => import('../../modules/home/home-view.jsx')));
const Verified = Loadable(lazy(() => import('../../modules/reports/verified-view')));
const Cancelled = Loadable(lazy(() => import('../../modules/reports/cancelled-view')));
const GeneralSetup = Loadable(lazy(() => import('../../modules/setup/general-setup-view')));
const PFUsers = Loadable(lazy(() => import('../../modules/reports/pfusers-view')));
const Attention = Loadable(lazy(() => import('../../modules/attention/attention')));
const LinkNotSent = Loadable(lazy(() => import('../../modules/link-not-sent/link-not-sent')));
const LapsedData = Loadable(lazy(() => import('../../modules/lapsed-data/lapsed-data')));
const ProcessingData = Loadable(
  lazy(() => import('../../modules/processing-data/processing-data')),
);
const MannualVerification = Loadable(
  lazy(() => import('../../modules/mannual-verification/mannual-verification')),
);
const DataUpload = Loadable(lazy(() => import('../../modules/data-upload/data-upload')));
const DataUpdata = Loadable(lazy(() => import('../../modules/data-update/data-update')));
const UploadedData = Loadable(lazy(() => import('../../modules/uploaded-data/uploaded-data')));
const CreateUserView = Loadable(
  lazy(() => import('../../modules/user/create-user/create-user-view')),
);
const UpdateUserView = Loadable(
  lazy(() => import('../../modules/user/update-user-view/update-user-view')),
);
const UserListView = Loadable(lazy(() => import('../../modules/user/userlist/userlist-view')));
const Report = Loadable(lazy(() => import('../../modules/reports/report')));
const AppointeeRegister = Loadable(
  lazy(() => import('../../modules/appointee/register/appointee-register')),
);
const ReuploadDocument = Loadable(
  lazy(() => import('../../modules/appointee/reupload-document/reupload-document')),
);
const AppointeeCount = Loadable(lazy(() => import('../../modules/reports/appointee-count')));
const AppointeeInvoice = Loadable(lazy(() => import('../../modules/reports/appointee-invoice')));
const Login = Loadable(lazy(() => import('../../modules/account/login/login-view')));
const SetPassword = Loadable(lazy(() => import('../../modules/set-password/set-password')));
const ReSetPassword = Loadable(lazy(() => import('../../modules/set-password/reset-password')));
const ManageProfile = Loadable(lazy(() => import('../../modules/manage-profile/manage-profile')));
const Help = Loadable(lazy(() => import('../../modules/help/help')));
const NoResponseAgingReport = Loadable(
  lazy(() => import('../../modules/reports/no-response-aging-view')),
);
const AppointeeAgingReport = Loadable(
  lazy(() => import('../../modules/reports/no-movement-aging-view')),
);
const AppointeeNationalityReport = Loadable(
  lazy(() => import('../../modules/reports/nationality-view')),
);
const AppointeeReport = Loadable(lazy(() => import('../../modules/reports/appointee-data-view')));
const ForgotPassword = Loadable(lazy(() => import('../../modules/account/login/forgot-password')));
const UserLogin = Loadable(lazy(() => import('../../modules/account/login/user-login-view')));
const PfPension = Loadable(lazy(() => import('../../modules/reports/pf-pension')));
const AadhaarSuccess = Loadable(
  lazy(() => import('../../modules/appointee/register/form-steps/verifications/aadhaar-verification-success-page')),
);
const AadhaarFailure = Loadable(
  lazy(() => import('../../modules/appointee/register/form-steps/verifications/aadhaar-verification-failed-page')),
);
const CustomRouter = [
  {
    path: '/',
    element: RequireAuth(FullLayout),
    children: [
      { path: toDashboard, exact: true, element: <Dashboard /> },
      { path: toVerified, exact: true, element: <Verified /> },
      { path: toCancelled, exact: true, element: <Cancelled /> },
      { path: toPFUsers, exact: true, element: <PFUsers /> },
      { path: toGeneralSetup, exact: true, element: <GeneralSetup /> },
      { path: toRegister, exact: true, element: <AppointeeRegister /> },
      { path: toReuploadDoc, exact: true, element: <ReuploadDocument /> },
      { path: toAttention, exact: true, element: <Attention /> },
      { path: toLinknotsent, exact: true, element: <LinkNotSent /> },
      { path: toLapseddata, exact: true, element: <LapsedData /> },
      { path: toProcessing, exact: true, element: <ProcessingData /> },
      { path: toMannualVerification, exact: true, element: <MannualVerification /> },
      { path: toDataUploaded, exact: true, element: <UploadedData /> },
      { path: toUplodData, exact: true, element: <DataUpload /> },
      { path: toUpdateData, exact: true, element: <DataUpdata /> },
      { path: toApiCountReport, exact: true, element: <Report /> },
      { path: toCreateUser, exact: true, element: <CreateUserView /> },
      { path: toUpdateUser, exact: true, element: <UpdateUserView /> },
      { path: toUserlist, exact: true, element: <UserListView /> },
      { path: toAppointeecount, exact: true, element: <AppointeeCount /> },
      { path: toAppointeeInvoice, exact: true, element: <AppointeeInvoice /> },
      { path: toManageProfile, exact: true, element: <ManageProfile /> },
      { path: toHelp, exact: true, element: <Help /> },
      { path: toNoResponseAgingReport, exact: true, element: <NoResponseAgingReport /> },
      { path: toNoMovementAgingReport, exact: true, element: <AppointeeAgingReport /> },
      { path: toNationalityReport, exact: true, element: <AppointeeNationalityReport /> },
      { path: toAppointeeReport, exact: true, element: <AppointeeReport /> },
      { path: topfPension, exact: true, element: <PfPension /> },
      { path: toAadhaarSuccess, element: <AadhaarSuccess /> },
      { path: toAadhaarFailure, element: <AadhaarFailure /> },
      { path: toPolicySetup, exact: true, element: <PolicySetup /> },
    ],
  },
  {
    path: toSetPassword,
    element: RequireAuth(() => (
      <BlankLayoutWithHeader>
        <SetPassword />
      </BlankLayoutWithHeader>
    )),
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      {
        path: toLogin,
        exact: true,
        element: (
          <MsalProvider instance={msalInstance}>{AuthorizedRedirection(Login)}</MsalProvider>
        ),
      },
      {
        path: toUserLogin,
        exact: true,
        element: AuthorizedRedirection(UserLogin),
      },
      {
        path: toForgotPassword,
        exact: true,
        element: AuthorizedRedirection(ForgotPassword),
      },
      {
        path: toReSetPassword,
        exact: true,
        element: AuthorizedRedirection(ReSetPassword),
      },
    ],
  },
  { path: '*', element: <Navigate to='/auth/404' /> },
];
export default CustomRouter;
