import { Female, Male, Transgender, TroubleshootTwoTone } from "@mui/icons-material";
import { Checkbox, Typography } from "@mui/material";
import { TableActionCell } from "shared/utils/dataTable/table-action-cell";
import TableClickableCell from "shared/utils/dataTable/table-clickable-cell";
import TableStatusCell from "shared/utils/dataTable/table-status-cell";

// messages
export const reportGenarate = `There is no data to export a report`
export const maxUploadSize = `Max size: 2MB`;
export const emptyUserNameField = `Username can't be empty`;
export const invalidUserCodeMsg = `User code should contain alphabet's and number only`;
export const defaultUploadFormat = `Accepted format: pdf, jpg, png`;
export const noRemarks = `No Remarks Available`;
export const noPassBookMsg = ` Please go to the Document Details section under the Open Details page.`;
export const noEmployementMsg = `Employment History not available`;
export const configurationSuccessMsg = `Configuration updated`;
export const userCreationSuccessMsg = `User has been created successfully`;
export const userUpdateSuccessMsg = `User has been updated successfully`;
export const userDeletedSuccessMsg = `User has been deleted successfully`;
export const invalidOtpMsg = `Otp must be of 6 digits`;
export const emptyAadharMsg = `Aadhaar name is empty`;
export const emptyShareCodeMsg = `Aadhaar share code is empty`;
export const emptyPanMsg = `PAN number or name on PAN is missing`;
export const aadharVerifySuccessMsg = `Aadhaar has been verified successfully`;
export const aadharVerifyFailedMsg = `Aadhaar has not been verified`;
export const uanVerifyFailedMsg = `UAN has not been verified`;
export const uanVerifySuccessMsg = `UAN has been verified successfully`;
export const generateOtpRety = `Otp sending is unsuccessful, please retry`;
export const generateOtpSucces = `OTP has sent successfully, Please fill the otp and submit`;
export const aadharNoValidationError = `Your phone number is not linked with Aadhaar. Link your phone number then retry or submit anyway`;
export const remarksError = `Remarks should have at least 15 charecters long`;
export const remarksemptyerror=`Please provide your remarks before submitting.`;
export const categoryFileEmptyerror=`Please go through all the Category(s) and Files, and select the required answers, mention Remarks to be able to Submit`;
export const fileEmptyerror=`Please select a file`; 
export const invalidPanMsg = `PAN number should be of 10 digits and properly formatted`;
export const invalidAadharMsg = `Aadhaar number should be of 12 digits`;
export const emptyAadharFileMsg = `Please upload Aadhaar`;
export const emptyPasswordField = `password can't be empty`;
export const fileUploadSuccess = `File upload completed`;
export const duplicateData = `There is no unique data for processing`;
export const processStarted = `Verification initiated  successfully`;
export const duplicateFiles = `file already exists, please choose a diferent one`;
export const formSubmitionSuccess = `Form has been submitted successfully`;
export const formSaveSuccess = `Form has been saved successfully`;
export const appointeeApproveSuccess = `Appointee has been approved successfully`;
export const appointeePensionUpdateSuccess = `Appointee Pension details has been updated successfully`;
export const appointeeRejectionSuccess = `Appointee has been Rejected`;
export const appointeeReprocessSuccess = `Appointee has been sent for reprocessing`;
export const aadharVerificationSuccess = `Aadhaar verified`;
export const editSuccess = `Appointee details has been updated successfully`;
export const appointteTerminationSuccess = `The process has been successfully terminated for this appointee`;
export const passportSuccessMsg = `Passport has been verified successfully`;
export const panSuccessMsg = `PAN details has been verified successfully`;
export const panVerifyFailedMsg = `PAN has not been verified`;
export const passportVerifyFailedMsg = `Passport details has not been verified`;
export const passportExpireddMsg = `Your passport has expired. Please set the Date of Expiry to a future date or mark 'Is Passport Available' as 'No'`;
export const fetchUanConfirmationtMsg = `Your Aadhaar or PAN verification has failed. If you continue you will not be able to change your Aadhaar or PAN.   want to continue?`;
export const remiderSuccessMsg = `A reminder has been sent successfully`;
export const noRecordsMsg = `No records found`;
export const noRemarksMsg = `No remarks available`;
export const emptyRowMsg = `Please select a row`;
export const addPassWordMsg = `Please go to profile settings and add a profile password`;
export const invalidPasswordMsg = `Password should have length 6-10, containing 1 letter, 1 number, 1 spacial character, please retry`;
export const invalidProfilePasswordMsg = `Password is not valid, please retry`;
export const passwordCreationSuccessMsg = `Password has been created successfully`;
export const passwordChangeSuccessMsg = `Password has been changed successfully`;
export const UANEmptyErrorMsg = `UAN number is required`;
export const aadharVerificationErrorMsg = `Please verify your Aadhar before submit`;
export const PANVerifictionErrorMsg = `Please verify your PAN before submit`;
export const dataSubmitionMsg = `Data submited successfully`;
export const generateNoMovementReportDesc = (days) => {
    return `This report provides an overview and analysis of appointees who have made no progress for${days > 0 ? ` ${days} days ` : ""} during a specified period. It includes detailed information about these candidates to help stakeholders understand progress patterns, identify issues, and may indicate that the candidate are not interest in joining .`;
};
export const generatePassbookDetailsReportDesc = `The purpose of this report is to allow for easy navigation and understanding of the employee's career progression and financial contributions across various positions and companies.This structure is aimed at providing a comprehensive view of both professional history and financial records for review and reference.`;
export const generateEmploymentHistoryReportDesc = `The purpose of this report is to provide a comprehensive summary of the employment history for the selected employee, detailing their previous roles, companies they have worked for, and their associated employment accounts. This report serves as a detailed record of the employee’s professional background, intended for use in verification, reference checks, or as part of an internal assessment.`;
export const generateAppointeeCountReportDesc = `The purpose of this report is to provide an overview and analysis of the appointee count added to the system on a daily basis during a specified period. This report includes details such as the total number of appointees added each day, the total number of links sent, and the total number of links not sent. The goal is to help stakeholders understand the usage patterns, identify any issues, and improve the efficiency of the system.`;
export const generateLapsedAppointeeReportDesc = `The purpose of this report is to provide an overview and analysis of lapsed users within the system during a specified period. This report includes details such as the names, email addresses, joining dates, and other relevant information of lapsed users. The goal is to help stakeholders understand the usage patterns, identify any issues, and improve the efficiency of the system.`;
export const generateProcessingAppointeeReportDesc = `The purpose of this report is to provide an overview and analysis of users that has been sent the verification link within the system during a specified period. This report includes details such as the names, email addresses, joining dates, and other relevant information of lapsed users. The goal is to help stakeholders understand the usage patterns, identify any issues, and improve the efficiency of the system.`;
export const generateapiCountReportDesc = `The purpose of this report is to provide an overview and analysis of the API calls made during a specified period. This report includes details such as the total number of API calls, the success and failure rates, and invalid requests. The goal is to help stakeholders understand the usage patterns,identify any issues, and improve the efficiency of the API system.`;
export const pfPensionReportDesc = `The purpose of this report is to provide a comprehensive overview of PF and Pension information for appointees within a specified date range. This report includes detailed fields such as appointee name, Aadhaar number, UAN number, joining date, PF and pension status, and passbook status (manual or automatic). The objective is to help stakeholders monitor appointees' provident fund and pension statuses, track essential details, and ensure all records are up-to-date and compliant with organizational policies.`;
export const verificatiosucess=`Your verification has been successfully completed.`

export const generatenationlityReportDesc = (type) => {
    switch (type) {
        case 'All':
            return "This report provides a comprehensive overview of individuals, including both Indian and foreign nationals, offering a complete view of all individuals.";
        case 'IN':
            return "This report gives an overview of important information about Indian nationals, highlighting their unique trends and details";
        case 'OTH':
            return "This report focuses on foreign individuals, offering detailed information and insights specifically related to non-Indian nationals. It highlights key trends and data that are important for understanding this group.";
        default:
            return "This report provides a comprehensive overview of individuals, including both Indian and foreign nationals, offering a complete view of all individuals.";
    }
};
export const EPFOVerificatypeSelectionMsg = "Please select and verify Fathers's name first";


// Dropdown Types
export const GEN = `GEN`;
export const NAT = `NAT`;
export const CON = `CON`;
export const MAR = `MAR`;
export const DIS = `DIS`;
export const FLT = `FLT`;
export const QUA = `QUA`;
export const RLE = `RLE`;
export const ENTITY = `ENTITY`;

// Date Format

export const dateFormat = `DD/MM/YYYY`;

// Button name

export const saveButton = "Save as Draft";
export const changePassword = "Change Password";
export const submitButton = "Submit";
export const saveAndNextbutton = "Save and Next";
export const previousButton = "Previous";
export const remarks = "Remarks";
export const startVerification = "Start Verification";

//Alias
export const nameAlias = "102";
export const genderAlias = "104";
export const fatherNameAlias = "101";
export const dobAlias = "100";
export const otherAlias = "107";
export const trustEpfoFileTypeAlias = "EPFPSBKTRUST";
export const epfoPassbookFileTypeAlias = "EPFPSSBKMNL";
export const epfoServiceHistoryFileTypeAlias = "EPFPSHF";
export const tenthCertificateFileTypeAlias = "10THCERT";
export const otherFileTypeAlias = "OTHID";
export const handicapFileTypeAlias = "HANDCERT";
export const aadharFileTypeAlias = "ADH";

export const passportFileTypeAlias = "VISA";
export const epfTypeAlias = "EPFPSBK";
export const epfExcelTypeAlias = "EPFPSBKEXCL";
export const epfFileTypeAlias = "EPFO";
export const epfFileCategoryTypeAlias = "EPFO";
export const fatherFileCategoryTypeAlias = "FTHR";

//Not Available
export const NA = "N/A"

// routes

export const toDashboard = "/dashboard";
export const toRegister = "/appointeeregister";
export const toReuploadDoc = "/reupload_document";
export const toPFUsers = "/pfusers";
export const toVerified = "/verified";
export const toCancelled = "/cancelled";
export const toGeneralSetup = "/setup";
export const toAttention = "/attention";
export const toLinknotsent = "/linknotsent";
export const toLapseddata = "/lapseddata";
export const toProcessing = "/processing";
export const toMannualVerification = "/manualverificationReport";
export const toUplodData = "/uploddata";
export const toUpdateData = "/updatedata";
export const toApiCountReport = "/apicountreport";
export const toCreateUser = "/createuser";
export const toUpdateUser = "/updateuser";
export const toUserlist = "/userlist";
export const toAppointeecount = "/appointeecount";
export const topfPension = "/PfPension";
export const toDataUploaded = "/datauploaded";
export const toLogin = "/auth/login";
export const toUserLogin = "/auth/userlogin";
export const toForgotPassword = "/auth/forgetpassword";
export const toManageProfile = "/manageprofile";
export const toSetPassword = "/setpassword";
export const toReSetPassword = "/auth/resetpassword";
export const toHelp = "/help";
export const toNoResponseAgingReport = "/noresponseagigreport";
export const toNoMovementAgingReport = "/nomovementagigreport";
export const toNationalityReport = "/nationalityreport";
export const toAppointeeReport = "/appointeereport";

// dropdown values start

export const genders = [<Male />, <Female />, <Transgender />].map((genderIcon) => {
    return {
        icon: genderIcon,
        selected: false
    }
})


// dropdown values start end
// table headercell start
const rejetedListActions = ['VIEWDETAILS'];
const latestAppointeeListActions = ['VIEWDETAILS'];
const verifiedListActions = ['VIEWDETAILS', 'DWNLDPSSBK', 'DWNLDTRUSTPSSBK', 'VIEWPSSBK'];
const procesingListActions = ['VIEWDETAILS', 'NOTIFYMAIL', 'USERMAILRESEND','REDIRECTMANVER'];
const mannualVerListActions = ['VIEWDETAILS', 'MANUALVER'];
const mannualReverListActions = ['VIEWDETAILS', 'MANUALREVER'];
const docReuploadListActions = ['VIEWDETAILS', 'NOTIFYMAIL'];
const criticalListActions = ['VIEWDETAILS', 'NOTIFYMAIL'];
const lapsedListActions = ['VIEWDETAILS', 'UPDTEAPNTEE'];
const userListActions = ['VIEWUSERDETAILS', 'UPDATEUSER', 'CLOSEUSERDETAILS'];
const viewDetailstActions = ['VIEWDETAILS'];


export const verifiedListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'adhaarNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhaar No.',
        enums: ['adhaarNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'panNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'PAN No.',
        enums: ['panNo'],
        component: {
            element: Typography
        }
    },
    
    {
        id: 'uanNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'UAN No. ',
        enums: ['uanNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'uanLinkWithAadhar',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhar-UAN Link',
        enums: ['uanLinkWithAadhar'],
        component: {
            element: Typography
        }
    },
    {
        id: 'isPensionApplicable',
        numeric: true,
        type: "boolean",
        disablePadding: false,
        label: ' EPS Member',
        enums: ['isPensionApplicable'],
        component: {
            element: Typography
        }
    },
    {
        id: 'isPensionGap',
        numeric: true,
        type: "boolean",
        disablePadding: false,
        label: 'EPS Gap',
        enums: ['isPensionGap'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Verification Status',
        enums: ['status'],
        component: {
            element: Typography
        }
    },
    {
        id: 'passbookStatus',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Verification Type',
        enums: ['passbookStatus'],
        component: {
            element: Typography
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: verifiedListActions, ...props }),
            attribute: ['appointeeId', 'uanNo', 'isPassbookVerified','passbookStatusCode']
        }
    }
];
export const rawAppointeeListTableHeadCell = [
    {
        id: 'checkBox',
        numeric: true,
        type: "checkBox",
        disablePadding: false,
        label: '',
        enums: [],
        component: {
            element: () =>
                <Checkbox
                    color="primary"
                />
        }
    },
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Joining Date ',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'companyName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Company Name ',
        enums: ['companyName'],
        component: {
            element: Typography
        }
    },

];
export const latestAppointeeListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'appointeeEmailId', 'mobileNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining  ',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Status',
        enums: ['status', 'isNoIsuueinVerification', 'isReprocess'],
        component: {
            element: (props) => TableStatusCell(props),
            attribute: ['appointeeId']
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Open Details',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: latestAppointeeListActions, ...props }),
            attribute: ['appointeeId']
        }
    }
]
//PFUsers
export const GetPfCreationListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining  ',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'adhaarNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhaar No.',
        enums: ['adhaarNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'panNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'PAN No.',
        enums: ['panNo'],
        component: {
            element: Typography
        }
    },
    
    {
        id: 'uanNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'UAN No. ',
        enums: ['uanNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'uanAadharLink',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhar-UAN Link',
        enums: ['uanAadharLink'],
        component: {
            element: Typography
        }
    },
    {
        id: 'isPensionApplicable',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'EPS Member',
        enums: ['isPensionApplicable'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Template Status',
        enums: ['status'],
        component: {
            element: Typography
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Open Details',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: verifiedListActions, ...props }),
            attribute: ['appointeeId']
        }
    }
]
export const rejectedListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'adhaarNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhaar No.',
        enums: ['adhaarNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'panNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'PAN No.',
        enums: ['panNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'rejectReason',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Rejection Reason',
        enums: ['rejectReason'],
        component: {
            element: (props) => TableClickableCell(props),
            attribute: ['appointeeId']
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'View Details',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: rejetedListActions, ...props }),
            attribute: ['appointeeId']
        }
    }
]
export const pfPensionTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'emailId'],
        component: {
            element: Typography
        }
    },
    {
        id:"candidateId",
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'adhaarNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhaar No.',
        enums: ['aadharNumber'],
        component: {
            element: Typography
        }
    },
    {
        id: 'uanNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'UAN No. ',
        enums: ['uan'],
        component: {
            element: Typography
        }
    },
    {
        id: 'isUanAadharLink',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhar-UAN Link',
        enums: ['isUanAadharLink'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining  ',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },

    {
        id: 'pfinfo',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'PF Type',
        enums: ['trustPassBookStatus', 'epfoPassBookStatus'],
        component: {
            element: (props) => TableStatusCell(props),
            attribute: ['appointeeId']
        }
    },

    {
        id: 'isEpsMember',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'EPS Membership',
        enums: ['isEpsMember'],
        component: {
            element: Typography
        }
    },
    {
        id: 'pensionStatus',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'EPS Gap',
        enums: ['pensionStatus'],
        component: {
            element: Typography
        }
    },
    {
        id: 'isManual',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Verification Type',
        enums: ['isManual'],
        component: {
            element: Typography
        }
    },

]
export const LinkNotSentTableHeadCell = [
    {
        id: 'checkBox',
        numeric: true,
        type: "checkBox",
        disablePadding: false,
        label: '',
        enums: [],
        component: {
            element: () =>
                <Checkbox
                    color="primary"
                />
        }
    },
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'appointeeEmailId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Emalil',
        enums: ['appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },

]
export const criticalListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'daysToJoin',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Days to Join',
        enums: ['daysToJoin'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Status',
        enums: ['status'],
        component: {
            element: Typography
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: criticalListActions, ...props }),
            attribute: ['appointeeId']
        }
    }
]
export const MVListPdfTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Mobile No.',
        enums: ['mobileNo'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['appointeeEmailId'],
    },
    {
        type: "date",
        label: 'Link Sent Date',
        enums: ['createdDate'],
    },
    {
        type: "date",
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
    },
    {
        type: "string",
        label: 'Status',
        enums: ['status'],
    }
]
export const RDListPdfTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Mobile No.',
        enums: ['mobileNo'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['appointeeEmailId'],
    },
    {
        type: "date",
        label: 'Link Sent Date',
        enums: ['createdDate'],
    },
    {
        type: "date",
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
    },
    {
        type: "string",
        label: 'Status',
        enums: ['status'],
    }
]
export const MRVListPdfTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Mobile No.',
        enums: ['mobileNo'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['appointeeEmailId'],
    },
    {
        type: "date",
        label: 'Link Sent Date',
        enums: ['createdDate'],
    },
    {
        type: "date",
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
    },
    {
        type: "string",
        label: 'Status',
        enums: ['status'],
    }
]
export const processingListPdfTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Mobile No.',
        enums: ['mobileNo'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['appointeeEmailId'],
    },
    {
        type: "date",
        label: 'Link Sent Date',
        enums: ['createdDate'],
    },
    {
        type: "date",
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
    },
    {
        type: "string",
        label: 'Status',
        enums: ['status'],
    }
]
export const mannualVerificationListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Status',
        enums: ['status', 'isNoIsuueinVerification', 'isReprocess'],
        component: {
            element: (props) => TableStatusCell(props),
            attribute: ['appointeeId']
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: mannualVerListActions, ...props }),
            attribute: ['appointeeId']
        }
    }
]
export const mannualReverificationListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'verificationAttempted',
        numeric: true,
        type: "boolean",
        disablePadding: false,
        label: 'Verification Attempted',
        enums: ['verificationAttempted'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Status',
        enums: ['status', 'isNoIsuueinVerification', 'isReprocess'],
        component: {
            element: (props) => TableStatusCell(props),
            attribute: ['appointeeId']
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: mannualReverListActions, ...props }),
            attribute: ['appointeeId']
        }
    }
]
export const docReuploadListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Status',
        enums: ['status', 'isNoIsuueinVerification', 'isReprocess'],
        component: {
            element: (props) => TableStatusCell(props),
            attribute: ['appointeeId']
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: docReuploadListActions, ...props }),
            attribute: ['appointeeId']
        }
    }
]
export const processingListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'consentStatusCode',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Consent',
        enums: ['consentStatusCode'],
        component: {
            element: (props) => TableStatusCell(props),
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Status',
        enums: ['status', 'isNoIsuueinVerification', 'isReprocess'],
        component: {
            element: (props) => TableStatusCell(props),
            attribute: ['appointeeId']
        }
    },
    {
        id: 'passbookStatus',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Verification Type',
        enums: ['passbookStatus'],
        component: {
            element: Typography
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: procesingListActions, ...props }),
            attribute: ['appointeeId','verificationStatusCode']
        }
    }
]
export const lapsedListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'appointeeEmailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Candidate ID',
        enums: ['candidateId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'consentStatusCode',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Consent',
        enums: ['consentStatusCode'],
        component: {
            element: (props) => TableStatusCell(props),
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "badge",
        disablePadding: false,
        label: 'Status',
        enums: ['status', 'isNoIsuueinVerification', 'isReprocess',],
        component: {
            element: Typography
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props1, props2) => TableActionCell({ actionList: lapsedListActions, ...props1 }, props2),
            attribute: ['appointeeId', 'id', 'dateOfJoining']
        }
    }
]
export const lapsedListPdfTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Mobile No.',
        enums: ['mobileNo'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['appointeeEmailId'],
    },
    {
        type: "date",
        label: 'Link Sent Date',
        enums: ['createdDate'],
    },
    {
        type: "date",
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
    },
    {
        type: "string",
        label: 'Status',
        enums: ['status'],
    }
]
export const userListTableHeadCell = [
    {
        id: 'userName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'User Name',
        enums: ['userName', 'emailId', 'phone'],
        component: {
            element: Typography
        }
    },
    {
        id: 'userCode',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'User Code',
        enums: ['userCode'],
        component: {
            element: Typography
        }
    },
    {
        id: 'role',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Role',
        enums: ['roleName'],
        component: {
            element: Typography
        }
    },

    {
        id: 'Actions',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: userListActions, ...props }),
            attribute: ['userId']
        }
    }
]
export const appointeeCountHeadCell = [
    {
        id: 'date',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Date',
        enums: ['date'],
        component: {
            element: Typography
        }
    },
    {
        id: 'totalAppointeeCount',
        numeric: true,
        type: "string",
        enums: ['totalAppointeeCount'],
        disablePadding: false,
        label: 'Total Appointee',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalLinkSentCount',
        numeric: true,
        type: "string",
        enums: ['totalLinkSentCount'],
        disablePadding: false,
        label: 'Total LinkSent',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalLinkNotSentCount',
        numeric: true,
        type: "string",
        enums: ['totalLinkNotSentCount'],
        disablePadding: false,
        label: 'Total Link Not Sent',
        component: {
            element: Typography
        }
    }
]
export const apiCountHeadCell = [
    {
        id: 'date',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Date',
        enums: ['date'],
        component: {
            element: Typography
        }
    },
    {
        id: 'providerName',
        numeric: false,
        type: "string",
        disablePadding: false,
        label: 'Provider',
        enums: ['providerName'],
        component: {
            element: Typography
        }
    },
    {
        id: 'apiName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Api',
        enums: ['apiName'],
        component: {
            element: Typography
        }
    },
    {
        id: 'totalApiCount',
        numeric: true,
        type: "string",
        enums: ['totalApiCount'],
        disablePadding: false,
        label: 'Total',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalFailureCount',
        numeric: true,
        type: "string",
        enums: ['totalFailureCount'],
        disablePadding: false,
        label: 'Failure',
        component: {
            element: Typography,
        }
    },
    {
        id: 'totalSuccessApiCount',
        numeric: true,
        type: "string",
        enums: ['totalSuccessApiCount'],
        disablePadding: false,
        label: 'Success',
        component: {
            element: Typography
        }
    },

    {
        id: 'totalUnprocessableEntityCount',
        numeric: true,
        type: "string",
        enums: ['totalUnprocessableEntityCount'],
        disablePadding: false,
        label: 'Invalid',
        component: {
            element: Typography
        }
    }
]
export const consoidateApiCountHeadCell = [
    {
        id: 'providerName',
        numeric: false,
        type: "string",
        disablePadding: false,
        label: 'Provider',
        enums: ['providerName'],
        component: {
            element: Typography
        }
    },
    {
        id: 'apiName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Api',
        enums: ['apiName'],
        component: {
            element: Typography
        }
    },
    {
        id: 'totalApiCount',
        numeric: true,
        type: "string",
        enums: ['totalApiCount'],
        disablePadding: false,
        label: 'Total',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalFailureCount',
        numeric: true,
        type: "string",
        enums: ['totalFailureCount'],
        disablePadding: false,
        label: 'Failure',
        component: {
            element: Typography,
        }
    },
    {
        id: 'totalSuccessApiCount',
        numeric: true,
        type: "string",
        enums: ['totalSuccessApiCount'],
        disablePadding: false,
        label: 'Success',
        component: {
            element: Typography
        }
    },

    {
        id: 'totalUnprocessableEntityCount',
        numeric: true,
        type: "string",
        enums: ['totalUnprocessableEntityCount'],
        disablePadding: false,
        label: 'Invalid',
        component: {
            element: Typography
        }
    }
]
export const appointeeCountDetailsHeadCell = [
    {
        id: 'date',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Date',
        enums: ['date'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        enums: ['candidateId'],
        disablePadding: false,
        label: 'Candidate ID',
        component: {
            element: Typography
        }
    },
    {
        id: 'companyName',
        numeric: true,
        type: "string",
        enums: ['companyName'],
        disablePadding: false,
        label: 'Entity Name',
        component: {
            element: Typography
        }
    },
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        enums: ['appointeeName'],
        disablePadding: false,
        label: 'AppointeeName',
        component: {
            element: Typography
        }
    },
    {
        id: 'emailId',
        numeric: true,
        type: "string",
        enums: ['emailId'],
        disablePadding: false,
        label: 'EmailId',
        component: {
            element: Typography
        }
    },
    {
        id: 'appointeeStatus',
        numeric: true,
        type: "string",
        enums: ['appointeeStatus'],
        disablePadding: false,
        label: 'Appointee Status',
        component: {
            element: Typography
        }
    },
    {
        id: 'actionTaken',
        numeric: true,
        type: "string",
        enums: ['actionTaken'],
        disablePadding: false,
        label: 'Action Taken',
        component: {
            element: Typography
        }
    },
]
export const apiCountDetailsHeadCell = [
    {
        id: 'date',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Date',
        enums: ['date'],
        component: {
            element: Typography
        }
    },
    {
        id: 'providerName',
        numeric: false,
        type: "string",
        disablePadding: false,
        label: 'Provider',
        enums: ['providerName'],
        component: {
            element: Typography
        }
    },
    {
        id: 'apiName',
        numeric: true,
        type: "string",
        enums: ['apiName'],
        disablePadding: false,
        label: 'Api Name',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalApiCount',
        numeric: true,
        type: "string",
        enums: ['totalApiCount'],
        disablePadding: false,
        label: 'Total Api Count',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalFailureCount',
        numeric: true,
        type: "string",
        enums: ['totalFailureCount'],
        disablePadding: false,
        label: 'Total Failure Count',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalSuccessApiCount',
        numeric: true,
        type: "string",
        enums: ['totalSuccessApiCount'],
        disablePadding: false,
        label: 'Total Success Count',
        component: {
            element: Typography
        }
    },
    {
        id: 'totalUnprocessableEntityCount',
        numeric: true,
        type: "string",
        enums: ['totalUnprocessableEntityCount'],
        disablePadding: false,
        label: 'Total Unprocessable Count',
        component: {
            element: Typography
        }
    },
]
export const noResponseListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'emailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        enums: ['candidateId'],
        disablePadding: false,
        label: 'Candidate ID',
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining ',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Status',
        enums: ['status'],
        component: {
            element: Typography
        }
    },
    {
        id: 'lastActivityDesc',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Last Activity Info',
        enums: ['lastActivityDesc'],
        component: {
            element: Typography
        }
    },
    {
        id: 'lastActionDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Last  Activity Date',
        enums: ['lastActionDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: viewDetailstActions, ...props }),
            attribute: ['appointeeId']
        }
    }
];
export const noMovementListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'emailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        enums: ['candidateId'],
        disablePadding: false,
        label: 'Candidate ID',
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Status',
        enums: ['status'],
        component: {
            element: Typography
        }
    },
    {
        id: 'lastActivityDesc',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Last Activity Info',
        enums: ['lastActivityDesc'],
        component: {
            element: Typography
        }
    },
    {
        id: 'lastActionDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Last Activity Date',
        enums: ['lastActionDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: viewDetailstActions, ...props }),
            attribute: ['appointeeId']
        }
    }
];
export const noResponseReportTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['emailId'],

    },
    {
        type: "string",
        label: 'Mobile No',
        enums: ['mobileNo'],

    },
    // {
    //     type: "string",
    //     enums: ['candidateId'],
    //     label: 'Candidate Id',
    // },
    {
        type: "date",
        label: 'Date Of Joining ',
        enums: ['dateOfJoining'],
    },
    {
        type: "date",
        label: 'Link Sent Date',
        enums: ['createdDate'],
    },
    {
        type: "string",
        label: 'Last Activity',
        enums: ['lastActivityDesc'],
    },
    {
        type: "date",
        label: 'Last Activity at',
        enums: ['lastActionDate'],
    }

];
export const nationalityListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'emailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        enums: ['candidateId'],
        disablePadding: false,
        label: 'Candidate ID',
        component: {
            element: Typography
        }
    },
    {
        id: 'nationality',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Nationality',
        enums: ['nationality'],
        component: {
            element: Typography
        }
    },
    {
        id: 'countryName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Country Name ',
        enums: ['countryName'],
        component: {
            element: Typography
        }
    },
    {
        id: 'passportNumber',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Passport Number',
        enums: ['passportNumber'],
        component: {
            element: Typography
        }
    },
    {
        id: 'startDate',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Start Date',
        enums: ['startDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'expiryDate',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Expiry Date',
        enums: ['expiryDate'],
        component: {
            element: Typography
        }
    }

];
export const nationalityReportTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['emailId'],

    },
    {
        type: "string",
        label: 'Mobile No',
        enums: ['mobileNo'],

    },
    {
        type: "string",
        label: 'Nationality',
        enums: ['nationality'],
    },
    {
        type: "string",
        label: 'Country',
        enums: ['countryName'],
    },
    {
        type: "string",
        label: 'Passport No.',
        enums: ['passportNumber'],
    },
    {
        type: "string",
        label: 'Start Date ',
        enums: ['startDate'],
    },
    {
        type: "string",
        label: 'Expiry Date',
        enums: ['expiryDate'],
    }

];

export const appointeeListTableHeadCell = [
    {
        id: 'appointeeName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Name',
        enums: ['appointeeName', 'mobileNo', 'emailId'],
        component: {
            element: Typography
        }
    },
    {
        id: 'candidateId',
        numeric: true,
        type: "string",
        enums: ['candidateId'],
        disablePadding: false,
        label: 'Candidate ID',
        component: {
            element: Typography
        }
    },
    {
        id: 'dateOfJoining',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Date Of Joining',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'createdDate',
        numeric: true,
        type: "date",
        disablePadding: false,
        label: 'Link Sent Date',
        enums: ['createdDate'],
        component: {
            element: Typography
        }
    },
    {
        id: 'status',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Status',
        enums: ['status'],
        component: {
            element: Typography
        }
    }

];
export const appointeeReportTableHeadCell = [
    {
        type: "string",
        label: 'Name',
        enums: ['appointeeName', 'candidateId'],
    },
    {
        type: "string",
        label: 'Email',
        enums: ['emailId'],

    },
    {
        type: "string",
        label: 'Mobile No.',
        enums: ['mobileNo'],

    },
    {
        type: "date",
        label: 'Date Of Joining ',
        enums: ['dateOfJoining'],
    },
    {
        type: "date",
        label: 'Link Sent Date',
        enums: ['createdDate'],
    },
    {
        type: "string",
        label: 'Status',
        enums: ['status'],
    }

];
// table headercell end
// export const stepperDefaultList = [
//     {
//         code: 'PD',
//         name: 'Personal Details',
//         step: 1
//     },
//     {
//         code: 'PassD',
//         name: 'Passport Details',
//         step: 2
//     },
//     {
//         code: 'OD',
//         name: 'Others Details',
//         step: 3
//     },
//     {
//         code: 'CF',
//         name: 'Cerificate FileUpload',
//         step: 4
//     }
// ]
export const stepperDefaultList = {
    PD: {
        name: 'Personal Details',
        step: 1
    },
    PassD: {
        name: 'Passport Details',
        step: 2
    },
    OD: {
        name: 'Others Details',
        step: 3
    },
    CF: {
        name: 'Cerificate / File Upload',
        step: 4
    }
}


// Apis urls
// const Api = `/api`;
// const Api = process.env.REACT_APP_API_PATH || ''; 
const AppointeeReports = `/AppointeeReports`;
const AppoienteeWorkFlow = `/AppoienteeWorkFlow`;
const Account = `/Account`;
const AadhaarValidate = `/AadhaarValidate`;
const FileUpload = `/FileUpload`;
const Users = `/Users`;

export const PasswordChange_URL = `${Account}/PostPasswordChange`;

export const DownloadSampleXlsFile_URL = `${FileUpload}/DownloadSampleXlsFile`;
export const DownloadUpdateSampleXlsFile_URL = `${FileUpload}/DownloadUpdateSampleXlsFile`;
export const UploadxlsFile_URL = `${FileUpload}/UploadxlsFile`;
export const UploadUpdatexlsFile_URL = `${FileUpload}/UploadUpdatexlsFile`;
export const DownloadPassbookFile_URL = `${FileUpload}/DownloadPassbookFile`;
export const getUploadFileData_URL = `${FileUpload}/getUploadFileData?appointeeId=`;
export const PostReuploadDocuments_URL = `${FileUpload}/PostReuploadDocuments`;


export const GetRawFileData_URL = (companyId, fileId) => `${FileUpload}/GetRawFileData?companyId=${companyId}&fileId=${fileId}`;

export const GetReportFilterStatus_URL = `${AppoienteeWorkFlow}/GetAllReportFilterStatus`;

export const ValidateUserLogIn_URL = `${Account}/ValidateUserLogIn`;
export const UserSignInDetailsByEmail_URL = `${Account}/UserSignInDetailsByEmail?email=`;
export const UserSignInDetails_URL = `${Account}/UserSignInDetails`;
export const GetMenuListData_URL = `${Account}/GetMenuListData?userId=`;
export const GetDashboardWidgetCardData_URL = (filterDays, isfilterd) => `${Account}/GetDashboardWidgetCardData?filterDays=${filterDays}&isfilterd=${isfilterd}`
export const GetAppointeeStatusDetails_URL = `${Account}/GetAppointeeStatusDetails?code=`;
export const PostSetupConfigData_URL = `${Account}/PostSetupConfigData`;
export const GetSetupConfigData_URL = `${Account}/GetSetupConfigData`;
export const GetMastarDropdowndata_URL = `${Account}/GetMastarDropdowndata?type=`;
export const GetTotalWidgetData_URL = `${Account}/GetTotalWidgetData`;
export const GetTotalCriticalAppointee_URL = `${Account}/GetTotalCriticalAppointee`;
export const ValidateProfilePassword_URL = `${Account}/ValidateProfilePassword`;
export const EditUserProfile_URL = `${Account}/EditUserProfile`;
export const GetFaqData_URL = `${Account}/GetFaqData`;
export const GetRefreshToken_URL = `${Account}/GenerateRefreshToken`;

export const RawDataProcess_URL = `${AppoienteeWorkFlow}/RawDataProcess`;
export const AppointeeDetailsUpdate_URL = `${AppoienteeWorkFlow}/CompanyAppointeeDetailsUpdate`;
export const PostAppointeeDetailsSave_URL = `${AppoienteeWorkFlow}/PostAppointeeDetailsSave`;
export const PostAppointeeSearch_URL = `${AppoienteeWorkFlow}/AppointeeSearch?appointeeName=`;
export const PostAppointeeFileDetails_URL = `${AppoienteeWorkFlow}/PostAppointeeDetailsSubmit`;
export const PostUpdatePfUanDetails_URL = `${AppoienteeWorkFlow}/UpdateDocWithUanDetails`;
export const PostAppointeeReprocess_URL = `${AppoienteeWorkFlow}/PostAppointeeReprocess`;
export const GetAppointeeDetails_URL = `${AppoienteeWorkFlow}/GetAppointeeDetails?appointeeId=`;
export const Postfileupload_URL = `${FileUpload}/GetUploadedFileDetailsById`
export const GetAppointeeActivity_URL = `${AppoienteeWorkFlow}/GetAppointeeActivity?appointeeId=`;
export const GetExpiredProcessFileData_URL = `${AppoienteeWorkFlow}/GetExpiredProcessFileData`;
export const GetUnderProcessFileData_URL = `${AppoienteeWorkFlow}/GetUnderProcessFileData`;
export const GetRejectedFileData_URL = `${AppoienteeWorkFlow}/GetRejectedFileData`;
export const PostAppointeeRejected_URL = `${AppoienteeWorkFlow}/PostAppointeeRejected`;
export const PostAppointeeApproved_URL = `${AppoienteeWorkFlow}/PostAppointeeApproved`;
export const PostAppointeePensionAvailable_URL = `${AppoienteeWorkFlow}/PostAppointeePensionVerification`;
export const GetProcessedEPFOData_URL = `${AppoienteeWorkFlow}/GetVerifiedData`;
export const GetUnProcessedFileData_URL = `${AppoienteeWorkFlow}/GetUnProcessedFileData`;
export const GetProcessedMISData_URL = `${AppoienteeWorkFlow}/GetProcessedMISData`;
export const GetCriticalAppointeeData_URL = `${AppoienteeWorkFlow}/GetCriticalAppointeeList`;
export const GetRemarksRemedyData_URL = `${AppoienteeWorkFlow}/GetRemarksRemedy`;
export const GetRemarks_URL = `${AppoienteeWorkFlow}/GetRemarks?AppointeeId=`;
export const GetMannualVerificationData_URL = `${AppoienteeWorkFlow}/GetManualVeificationProcessData`;
export const PostAppointeeClose_URL = `${AppoienteeWorkFlow}/PostAppointeeClose`;
export const PostRemainderMail_URL = (appointeeId, userId) => `${AppoienteeWorkFlow}/PostRemainderMail?AppointeeId=${appointeeId}&UserId=${userId}`
export const PostCandidateMailResend_URL = (appointeeId, userId) => `${AppoienteeWorkFlow}/PostCandidateMailResend?AppointeeId=${appointeeId}&UserId=${userId}`
export const GetPfCreationApponteeReport_URL = `${AppointeeReports}/GetPfCreationApponteeReport`;
export const downloadVerifiedList_URL = `${AppointeeReports}/ApprovedApponteeReport`;
export const downloadPfCreationApponteeList_URL = `${AppointeeReports}/DownloadPfCreationApponteeReport`;
export const downloadRejectedList_URL = `${AppointeeReports}/RejectedApponteeReport`;
export const downloadProcessingList_URL = `${AppointeeReports}/GetUnderProcessReport`;
export const downloadLapsedList_URL = `${AppointeeReports}/GetLapsedDataReport`;
export const downloadApiCounterReport_URL = `${AppointeeReports}/ApiCounterReport`;
export const downloadpfReport_URL = `${AppointeeReports}/AppointeeDataPfFilterReport`;


export const AppointeeAgingFilterReport_URL = `${AppointeeReports}/AppointeeAgingFilterReport`
export const AppointeeNationalityReport_URL = `${AppointeeReports}/NationalityFilterReport`
export const AppointeeDataReport_URL = `${AppointeeReports}/AppointeeDataFilterReport`
export const AppointeeCounterReport_URL = `${AppointeeReports}/AppointeeCounterReport`
export const ApiCounterReport_URL = (fromDate, toDate) => {
    let ApiCounterReportUrl = `${AppointeeReports}/ApiCounterReport`
    if (fromDate && toDate) {
        ApiCounterReportUrl = `${ApiCounterReportUrl}?FromDate=${fromDate}&ToDate=${toDate}`;
    }
    return ApiCounterReportUrl
};
export const PassbookDetails_URL = `${AppoienteeWorkFlow}/GetPassbookDetails?AppointeeId=`;
export const UpdateAppointeeManualVerification_URL = `${AppoienteeWorkFlow}/UpdateAppointeeManualVerification`;
// export const EmployementDetails_URL = `${AppoienteeWorkFlow}/GetEmployementDetails?AppointeeId=`;
export const EmployementDetails_URL = (AppointeeId, userId) => {
    let _EmployementDetails_URL = `${AppoienteeWorkFlow}/GetEmployementDetails`
    return `${_EmployementDetails_URL}?AppointeeId=${AppointeeId}&userId=${userId}`;
};

export const VerifyPassportDetails_URL = `${AadhaarValidate}/VerifyPassportDetails`;
export const VerifyPanDetails_URL = `${AadhaarValidate}/VerifyPanDetails`;
export const VerifyAadharViaXml_URL = `${AadhaarValidate}/VerifyAadharViaXml`;
export const GenerateUANOTP_URL = `${AadhaarValidate}/UANGenerateOTP`;
export const GetUANNumber_URL = `${AadhaarValidate}/GetUANDetails`;
export const UANSubmitOTP_URL = `${AadhaarValidate}/UANSubmitOTP`;

export const GetAdminUserList_URL = `${Users}/GetAdminUserList`;
export const CreateUser_URL = `${Users}/CreateUser`;
export const UpdateAdminUser_URL = `${Users}/UpdateAdminUser`;
export const GetUserByUserId_URL = `${Users}/GetUserByUserId?userId=`;
export const ValidateUserCode_URL = `${Users}/ValidateUserCode?userCode=`;
export const AppointeeConsentUpdate_URL = `${Users}/AppointeeConsentUpdate`;
export const AppointeePrerequisiteUpdate_URL = `${Users}/AppointeePrerequisiteUpdate`;
export const ChangePasswordGenerateOTP_URL = `${Account}/ChangePasswordGenerateOTP`;
export const ValidateUserByOtpForgetPassword_URL = `${Account}/ValidateUserByOtpForgetPassword`;

export const RemoveAdminUser_URL = (id, userId) => `${Users}/RemoveAdminUser?id=${id}&userId=${userId}`;

//Apis urls

//Models messages starts
export const aaddharNumberverify = `Please complete Aadhaar verification before proceeding.`
export const approveConfirmation = `Auto / manual verification process of appointee has not been completed successfully. Do you still want to force approve?`;
export const pensionConfirmation = `Does appointee have Pension under EPFO? Yes / No"?`;
export const uploadSizeErrorMsg = `File upload size limit has exceeded`;
export const indianpassportFilePatternErrorMsg = 'Indian Passport File Number must be 12 digits alphanumeric code';
export const passportFilePatternErrorMsg = 'Passport File Number must be of maximum 20 digits';
export const passportNoEmptyMsg = 'Passport Number cannot be empty';
export const uploadFormatErrorMsg = `Upload valid formatted file`;
export const verificationConfirmationMsg = `Do you want to send verification portal link to the appointee(s)? [Note: Appointee(s) will be removed from this page and moved to the "Processing" page]`;
export const appointeerejetionConfirmationMsg = `Are you sure you want to reject the appointee?`;
export const verificationRemiderMsg = `Reminder alert will be sent to appointee, asking them to complete the verification process. Do you want to continue?`;
export const credentialRemiderMsg = `An alert with login credentials will be sent to the appointee to complete the verification process. Would you like to proceed?`;
export const appointeeTerminationConfirmationMsg = `Do you want to terminate the process?`;
export const passwordMaxFieldErrorMsg = 'Length exceeded. Password can be of maximum 12 characters.';
export const notProcessedDataVerificationConfirmationMsg = `Do you want to send verification portal link to the appointees? [Note: Appointees will be removed from this page and moved to the "Processing" page]`;
export const submitConfirmationMsg = `Your data will be submitted to PwC HC for verification. Hence you will no longer be able to change your data. Only PwC HC can decide to allow you to update /reverify data. Are you sure you want to submit?`;
export const reUploadsubmitConfirmationMsg = "Your re-uploaded document(s) will be submitted to PwC HC for verification. Hence you will no longer be able to change your data. Are you sure you want to submit?";
export const epfoPassfileUploadeConfirmationMsg = `Please upload your entire Trust / private PF passbook(s) before submission`;
export const visafileUploadeConfirmationMsg = `Please upload your visa copy before submission`;
export const registrationSuccessDialogContentText = `Your Aadhaar & UAN details has been verified and submitted successfully. You have completed your verification process. Please wait for the HR to reply for further processing of your application`;
export const docResubmissionSuccessDialogContentText = `Your documents have been submitted successfully. Please wait for your documents to be verified by PwC HC. .`;
export const welcomeMsg = `Welcome to VERIDATA, PwC's onboarding assistant for you.\n
1. Review the Prerequisite Details.\n
2. Click 'Start Verification' to begin the process (which includes giving consent).\n
Fill in the required information to complete verification.`;
export const congratulationDialogContentTitle = `Congratulatoins!👍`;
export const useCodeEmptyMsg = `User code cant not be empty`;
export const passwordEmptyMsg = `Password cant not be empty`;
export const OtpEmptyMsg = `Otp cant not be empty`;
export const passwordNotMsg = `Password not matched`;
export const confirmpasswordNotMsg = `Confirm password is not matched with password`;
export const passwordPattern = `Password should be of atleast 8 - 12 characters long, with atleast 1 UPPER CASE, 1 lower case, 1 number, and one special charecter`;
export const invalidPasswordPatternMsg = `Password should contain atleast one special character, one lower case and one upper case character, one number of minlength 8 and maxlength 15`;
export const remarksEmptyMsg = `Remarks cant not be empty`;
export const otpToMailMsg = `A verification code has been sent to your email address, Please check and enter `;
export const setPasswordOtpToMailMsg = `A verification code has been sent to your email address, Please check and enter it in otp field `;
export const emailEmptyMsg = `Email can't not be empty`;
export const invalidEmailMsg = `Enter a valid email`;
export const contactNoEmptyMsg = `Contact no can't be empty`;
export const invalidcontactNoMsg = `Phone no should have 10 digits`;
export const roleEmptyMsg = `Role can't be empty`;
export const verifiedReportInfo = `Trust PF data is not reflected in following fields: Pension Applicable, EPFO passbook, EPFO employment history. You can download Trust passbook details from respective Action`;
export const timeOutMsg = `Server is down, Please try again.`;
//export const manualSubmitConfirmatonMsg = `Are you sure you want to submit?`;
export const manualSubmitConfirmatonMsg = `Based on your answers, Veridata will either Verify the candidate or send Issue list to candidate for reuploading the correct and required documents. Do you want to proceed & Submit?`;

export const ManualSubmitConfirmation = ({type}) => {
 
    
    const manualSubmitConfirmatonMsgforfile = `You have not gone through all ${type}, and there may be information that you have missed out.\nAre you sure you want to continue with the submission?`;
  
    return (
      <div >
        {manualSubmitConfirmatonMsgforfile.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    );
  };

export const getStatusTooltip = (status) => {
    switch (status) {
        case "Issue":
            return "There is an issue that needs to be solved.";
        case "Submitted":
            return "Your data has been submitted successfully. HR Admin will take action accordingly.";
        case "Ongoing":
            return "Verification in progress";
        case "No Response":
            return "There has been no response yet.";
        case "Success":
            return "The verificaton was successful.";
        case "Cancelled":
            return "process has been cancelled.";
        case "Lapsed":
            return "Verification process incomplete and Date of Joining is over.";
        case "Verified":
            return "Verification process completed successfully"
        case "Manual Verification Required":
            return "Manual Verification Required"
        case "Document Reupload Request":
            return "HC Requests You to Reupload Your Document"  
        default:
            return
    }
};

export const getTooltipforStatus=(statusCode)=>{
 switch(statusCode){
    case "SUBMT":
        return "Your data has been submitted successfully. HR Admin will take action accordingly.";
    case "APPRVD":
        return "Approved successfully."
    case "DCRUPLD":
        return "Document re-upload required." 
    case "ONGNG":
        return "Verification in progress"     
    case "REJCT":
        return "You are Rejected by Admin."
    case "NORES":
        return "There has been no response yet."        
    default:
        return
 }
}
export const getHandicapTypeDescription = (type) => {
    switch (type) {
        case 'L':
            return 'Locomotive';
        case 'H':
            return 'Hearing';
        case 'V':
            return 'Visual';
        default:
            return ''; // Return an empty string for any unrecognized type
    }
};


export const FILE_SIZE_LIMIT = 4000000; // 4MB
export const imgAndPdfMaxSize = '2MB';
export const imgAndPdfMaxSizeValue = 2000000;

export const validFileTypes = [
    "application/x-zip-compressed",
    "application/x-compressed",
    "application/zip",
];


export const roleTypeEnums = {
    admin: [1, 2],     // userTypeId 1 or 2 is admin
    candidate: [3],    // userTypeId 3 is candidate
};

export const issueFilterList = [
    {
        value: 'All',
        label: 'Select All'
    },
    {
        value: true,
        label: 'Candidates with issues'
    },
    {
        value: false,
        label: 'Candidates without issues'
    }
]

export const passbookCategoryTypeList = [
    {
        value: 'PASSBOOKSERVICEHIST',
        label: 'Passbook Service History'
    },
    {
        value: 'PASSBOOKMANUAL',
        label: 'Passbook Manual Upload'
    }
]
export const fatherDocCategoryTypeList = [
    {
        value: '10THCERTIFICATE',
        label: '10th pass Certificate'
    },
    {
        value: 'OTHERID',
        label: 'Others Certificate'
    }
]
export const verificationCategoryModel = {
    'EPFO': passbookCategoryTypeList,
    'FTHR': fatherDocCategoryTypeList
}
export const defaultVerificationTypeList = [
    // {
    //     value: 'none',
    //     label: 'None',
    //     isDisabled: false,
    //     verificationFieldName: 'none',
    // },
    {
        value: fatherFileCategoryTypeAlias,
        label: `Father's Name`,
        verificationFieldName: 'isFnameVarified'
    },
    {
        value: epfFileCategoryTypeAlias,
        label: 'EPFO',
        verificationFieldName: 'isUanVerified',
        isDisabled: true
    }
]

export const fileTypeList = [
    {
        value: 'All',
        label: 'Select All'
    },
    {
        value: 'Type 1',
        label: 'Category 1'
    },
    {
        value: 'Type 2',
        label: 'Category 2'
    }
]

export const defaultVerificationUpdate = {
    isDocComplete: undefined,
    isDocValid: undefined
}
export const defaultFnameVerificationUpdate = {
    [`isDocComplete_${fatherFileCategoryTypeAlias}`]: undefined,
    [`isDocValid_${fatherFileCategoryTypeAlias}`]: undefined
}
export const defaultEpfoPassbookVerificationUpdate = {
    [`isDocComplete_${epfoServiceHistoryFileTypeAlias}`]: undefined,
    [`isDocValid_${epfoServiceHistoryFileTypeAlias}`]: undefined,
     [`isDocComplete_${epfoPassbookFileTypeAlias}`]: undefined,
     [`isDocValid_${epfoPassbookFileTypeAlias}`]: undefined
}

export const fileVerificationEnums = {
    docComplete: "isDocComplete",
    docValid: "isDocValid",
    docFname: "isFnameVarified",
    docEPFO: "isUanVerified",
    pensionApplicable: "isPensionApplicable",
    pensionGapFound: "isPensionGapFound",
}

export const uploadAliasCategory = {
    // : isUanVarified, 
    [tenthCertificateFileTypeAlias]: {
        categoryType: 'isFnameVarified'
    },
    [otherFileTypeAlias]: {
        categoryType: 'isFnameVarified'
    },
    [epfoServiceHistoryFileTypeAlias]: {
        categoryType: 'isUanVarified'
    },
    [epfoPassbookFileTypeAlias]: {
        categoryType: 'isUanVarified'
    }
}
// export const defaultVerificationQuestionSet = [
//     {
//         label: "Completeness of  document?",
//         name: fileVerificationEnums.docComplete,
//         disabled: false,
//     },
//     {
//         label: "Correctness of document?",
//         name: fileVerificationEnums.docValid,
//         disabled: false,
//     },
// ]
export const fatherVerificationQuestionSet = [
    {
        label: "Completeness of document?",
        name: fileVerificationEnums.docComplete,
        subCategory: fatherFileCategoryTypeAlias,
        type: "prerequisite", // Indicates it's a prerequisite for dependent questions
        disabled: true,
    },
    {
        label: "Correctness of document?",
        name: fileVerificationEnums.docValid,
        subCategory: fatherFileCategoryTypeAlias,
        type: "prerequisite", // Indicates it's a prerequisite for dependent questions
        disabled: true,
    },
    {
        label: "Document's Father's Name matches with Candidate provided Father's Name?",
        name: fileVerificationEnums.docFname,
        subCategory: fatherFileCategoryTypeAlias,
        type: "dependent", // Indicates this depends on the prerequisites
        dependsOn: [fileVerificationEnums.docComplete, fileVerificationEnums.docValid], // Links to prerequisites
        disabled: true,
    }
]
export const passbookVerificationQuestionSet = [
    {
        label: "Completeness of Service History document?",
        name: fileVerificationEnums.docComplete,
        subCategory: epfoServiceHistoryFileTypeAlias,
        type: "prerequisite",
        disabled: TroubleshootTwoTone
    },
    {
        label: "Correctness of Service History document?",
        name: fileVerificationEnums.docValid,
        subCategory: epfoServiceHistoryFileTypeAlias,
        type: "prerequisite",
        disabled:true,
    },
    {
        label: "Completeness of Passbook document(s)?",
        name: fileVerificationEnums.docComplete,
        subCategory: epfoPassbookFileTypeAlias,
        type: "prerequisite",
        disabled: true,
    },
    {
        label: "Correctness of Passbook document(s)?",
        name: fileVerificationEnums.docValid,
        subCategory: epfoPassbookFileTypeAlias,
        type: "prerequisite",
        disabled:true,
    },
    {
        label: "Is member of EPS?",
        name: fileVerificationEnums.pensionApplicable,
        subCategory: epfoPassbookFileTypeAlias,
        dependsOn: [fileVerificationEnums.docComplete, fileVerificationEnums.docValid,fileVerificationEnums.DocComplete,fileVerificationEnums.docValid],
        disabled: true
    },
    {
        label: "Is EPS gap identified?",
        name: fileVerificationEnums.pensionGapFound,
        subCategory: epfoPassbookFileTypeAlias,
        dependsOn: [fileVerificationEnums.docComplete, fileVerificationEnums.docValid,fileVerificationEnums.pensionApplicable],
        disabled: true
    }
]

