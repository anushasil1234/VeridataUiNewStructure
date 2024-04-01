import { Female, Male, Transgender } from "@mui/icons-material";
import { Checkbox, Typography } from "@mui/material";
import { TableActionCell } from "shared/utils/dataTable/table-action-cell";
import TableClickableCell from "shared/utils/dataTable/table-clickable-cell";
import TableStatusCell from "shared/utils/dataTable/table-status-cell";

// messages

export const maxUploadSize = `Max size: 4mb`;
export const emptyUserNameField = `Username can't be empty`;
export const invalidUserCodeMsg = `User code should contain alphabet's and number only`;
export const defaultUploadFormat = `Accepted format: pdf, jpg, png`;
export const noRemarks = `No Remarks Available`;
export const noPassBookMsg = `Passbook not available`;
export const configurationSuccessMsg = `Configuration updated`;
export const userCreationSuccessMsg = `User has been created successfully`;
export const userUpdateSuccessMsg = `User has been updated successfully`;
export const userDeletedSuccessMsg = `User has been deleted successfully`;
export const invalidOtpMsg = `Otp must be of 6 digits`;
export const emptyAadharMsg = `Aadhar name is empty`;
export const emptyShareCodeMsg = `Aadhar share code is empty`;
export const emptyPanMsg = `Pan number or name on Pan is missing`;
export const aadharVerifySuccessMsg = `Aadhar has been verified successfully`;
export const aadharVerifyFailedMsg = `Aadhar has not been verified`;
export const uanVerifyFailedMsg = `UAN has not been verified`;
export const uanVerifySuccessMsg = `UAN has been verified successfully`;
export const generateOtpRety = `Otp sending is unsuccessful, please retry`;
export const generateOtpSucces = `OTP has sent successfully, Please fill the otp and submit`;
export const aadharNoValidationError = `Your phone number is not linked with aadhar. Link your phone number then retry or submit anyway`;
export const invalidPanMsg = `Pan number should be of 10 digits and properly formatted`;
export const invalidAadharMsg = `Aadhar number should be of 12 digits`;
export const emptyAadharFileMsg = `Please upload aadhar`;
export const emptyPasswordField = `password can't be empty`;
export const fileUploadSuccess = `File upload completed`;
export const duplicateData = `There is no unique data for processing`;
export const processStarted = `Verification initiated  successfully`;
export const duplicateFiles = `Both the files are same. Choose different one`;
export const formSubmitionSuccess = `Form has been submitted successfully`;
export const formSaveSuccess = `Form saved`;
export const appointeeApproveSuccess = `Appointee has been approved successfully`;
export const appointeeRejectionSuccess = `Appointee has been Rejected`;
export const appointeeReprocessSuccess = `Appointee has been sent for reprocessing`;
export const aadharVerificationSuccess = `Aadhar verified`;
export const editSuccess = `Appointee details has been updated successfully`;
export const appointteTerminationSuccess = `The process has been successfully terminated for this appointee`;
export const passportSuccessMsg = `Passport has been verified successfully`;
export const panSuccessMsg = `PAN details has been verified successfully`;
export const panVerifyFailedMsg = `PAN has not been verified`;
export const passportVerifyFailedMsg = `Passport details has not been verified`;
export const fetchUanConfirmationtMsg = `Your aadhar or pan verification has failed. If you continue you will not be able to change your aadhar or pan.   want to continue?`;
export const remiderSuccessMsg = `A reminder has been sent successfully`;
export const noRecordsMsg = `No records found`;
export const noRemarksMsg = `No remarks available`;
export const emptyRowMsg = `Please select a row`;
export const addPassWordMsg = `Please go to profile settings and add a profile password`;
export const invalidPasswordMsg = `Password should have length 6-10, containing 1 letter, 1 number, 1 spacial character, please retry`;
export const invalidProfilePasswordMsg = `Password is not valid, please retry`;
export const passwordCreationSuccessMsg = `Password has been created successfully`;



// Dropdown Types
export const GEN = `GEN`;
export const NAT = `NAT`;
export const CON = `CON`;
export const MAR = `MAR`;
export const DIS = `DIS`;
export const FLT = `FLT`;
export const QUA = `QUA`;
export const RLE = `RLE`;

// Date Format

export const dateFormat = `DD/MM/YYYY`;

// Button name

export const saveButton = "Save as draft";
export const submitButton = "Submit";
export const saveAndNextbutton = "Save and next";
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
export const aadharFileTypeAlias = "ADH";
export const passportFileTypeAlias = "VISA";
export const epfTypeAlias = "EPFPSBK";
export const epfExcelTypeAlias = "EPFPSBKEXCL";

//Not Available
export const NA = "N/A"

// routes

export const toDashboard = "/dashboard";
export const toRegister = "/appointeeregister";
export const toPFUsers = "/pfusers";
export const toVerified = "/verified";
export const toCancelled = "/cancelled";
export const toGeneralSetup = "/setup";
export const toAttention = "/attention";
export const toLinknotsent = "/linknotsent";
export const toLapseddata = "/lapseddata";
export const toProcessing = "/processing";
export const toUplodData = "/uploddata";
export const toUpdateData = "/updatedata";
export const toApiCountReport = "/apicountreport";
export const toCreateUser = "/createuser";
export const toUpdateUser = "/updateuser";
export const toUserlist = "/userlist";
export const toAppointeecount = "/appointeecount";
export const toDataUploaded = "/datauploaded";
export const toLogin = "/auth/login";
export const toManageProfile = "/manageprofile";

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
const verifiedListActions = ['VIEWDETAILS', 'DWNLDPSSBK', 'DWNLDTRUSTPSSBK','VIEWPSSBK'];
const procesingListActions = ['VIEWDETAILS', 'NOTIFYMAIL'];
const criticalListActions = ['VIEWDETAILS', 'NOTIFYMAIL'];
const lapsedListActions = ['VIEWDETAILS', 'UPDTEAPNTEE'];
const userListActions = ['VIEWUSERDETAILS', 'UPDATEUSER', 'CLOSEUSERDETAILS'];

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
        id: 'adhaarNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhar',
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
        label: 'PAN',
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
        label: 'Joining Date ',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'uanNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'UAN Number ',
        enums: ['uanNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'isPensionApplicable',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Pension Applicable',
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
            element: (props) => TableActionCell({ actionList: verifiedListActions, ...props }),
            attribute: ['appointeeId', 'isTrustPFApplicable']
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
        label: 'Joining Date ',
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
        label: 'View Details',
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
        id: 'adhaarNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhar',
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
        label: 'PAN',
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
        label: 'Joining Date ',
        enums: ['dateOfJoining'],
        component: {
            element: Typography
        }
    },
    {
        id: 'uanNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'UAN Number ',
        enums: ['uanNo'],
        component: {
            element: Typography
        }
    },
    {
        id: 'isPensionApplicable',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Pension Applicable',
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
        label: 'View Details',
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
        id: 'adhaarNo',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Aadhar',
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
        label: 'PAN',
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
        label: 'Joining Date ',
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
        label: 'Joining Date ',
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
        label: 'Joining Date',
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
export const processingListPdfTableHeadCell = [
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
        label: 'Joining Date',
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
        label: 'Joining Date',
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
        id: 'viewDetails',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Actions',
        enums: ['viewDetails'],
        component: {
            element: (props) => TableActionCell({ actionList: procesingListActions, ...props }),
            attribute: ['appointeeId']
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
        label: 'Joining Date',
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
        label: 'Joining Date',
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
            element: Typography
        }
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
        id: 'apiName',
        numeric: true,
        type: "string",
        disablePadding: false,
        label: 'Api Name',
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
        label: 'Total Api',
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
        label: 'Total Failure',
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
        label: 'Total Success',
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
        label: 'Total Unprocessable',
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
        label: 'Candidate Id',
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

// table headercell end

// Apis urls
const Api = `/api`;
const AppointeeReports = `${Api}/AppointeeReports`;
const AppoienteeWorkFlow = `${Api}/AppoienteeWorkFlow`;
const Account = `${Api}/Account`;
const AadhaarValidate = `${Api}/AadhaarValidate`;
const FileUpload = `${Api}/FileUpload`;
const Users = `${Api}/Users`;

export const DownloadSampleXlsFile_URL = `${FileUpload}/DownloadSampleXlsFile`;
export const DownloadUpdateSampleXlsFile_URL = `${FileUpload}/DownloadUpdateSampleXlsFile`;
export const UploadxlsFile_URL = `${FileUpload}/UploadxlsFile`;
export const UploadUpdatexlsFile_URL = `${FileUpload}/UploadUpdatexlsFile`;
export const DownloadPassbookFile_URL = `${FileUpload}/DownloadPassbookFile`;

export const GetRawFileData_URL = (companyId, fileId) => `${FileUpload}/GetRawFileData?companyId=${companyId}&fileId=${fileId}`;

export const GetReportFilterStatus_URL = `${AppoienteeWorkFlow}/GetAllReportFilterStatus`;

export const ValidateUserLogIn_URL = `${Account}/ValidateUserLogIn`;
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

export const RawDataProcess_URL = `${AppoienteeWorkFlow}/RawDataProcess`;
export const AppointeeDetailsUpdate_URL = `${AppoienteeWorkFlow}/CompanyAppointeeDetailsUpdate`;
export const PostAppointeeDetailsSave_URL = `${AppoienteeWorkFlow}/PostAppointeeDetailsSave`;
export const PostAppointeeSearch_URL = `${AppoienteeWorkFlow}/AppointeeSearch?appointeeName=`;
export const PostAppointeeFileDetails_URL = `${AppoienteeWorkFlow}/PostAppointeeFileDetails`;
export const PostAppointeeReprocess_URL = `${AppoienteeWorkFlow}/PostAppointeeReprocess`;
export const GetAppointeeDetails_URL = `${AppoienteeWorkFlow}/GetAppointeeDetails?appointeeId=`;
export const GetAppointeeActivity_URL = `${AppoienteeWorkFlow}/GetAppointeeActivity?appointeeId=`;
export const GetExpiredProcessFileData_URL = `${AppoienteeWorkFlow}/GetExpiredProcessFileData`;
export const GetUnderProcessFileData_URL = `${AppoienteeWorkFlow}/GetUnderProcessFileData`;
export const GetRejectedFileData_URL = `${AppoienteeWorkFlow}/GetRejectedFileData`;
export const PostAppointeeRejected_URL = `${AppoienteeWorkFlow}/PostAppointeeRejected`;
export const PostAppointeeApproved_URL = `${AppoienteeWorkFlow}/PostAppointeeApproved`;
export const GetProcessedEPFOData_URL = `${AppoienteeWorkFlow}/GetVerifiedData`;
export const GetUnProcessedFileData_URL = `${AppoienteeWorkFlow}/GetUnProcessedFileData`;
export const GetProcessedMISData_URL = `${AppoienteeWorkFlow}/GetProcessedMISData`;
export const GetCriticalAppointeeData_URL = `${AppoienteeWorkFlow}/GetCriticalAppointeeList`;
export const GetRemarksRemedyData_URL = `${AppoienteeWorkFlow}/GetRemarksRemedy?remarksId=`;
export const GetRemarks_URL = `${AppoienteeWorkFlow}/GetRemarks?AppointeeId=`;
export const PostAppointeeClose_URL = `${AppoienteeWorkFlow}/PostAppointeeClose`;
export const PostRemainderMail_URL = `${AppoienteeWorkFlow}/PostRemainderMail?AppointeeId=`;
export const GetPfCreationApponteeReport_URL = `${AppointeeReports}/GetPfCreationApponteeReport`;
export const downloadVerifiedList_URL = `${AppointeeReports}/ApprovedApponteeReport`;
export const downloadPfCreationApponteeList_URL = `${AppointeeReports}/DownloadPfCreationApponteeReport`;
export const downloadRejectedList_URL = `${AppointeeReports}/RejectedApponteeReport`;
export const downloadProcessingList_URL = `${AppointeeReports}/GetUnderProcessReport`;
export const downloadLapsedList_URL = `${AppointeeReports}/GetLapsedDataReport`;
export const downloadApiCounterReport_URL = `${AppointeeReports}/ApiCounterReport`;

export const AppointeeCounterReport_URL = `${AppointeeReports}/AppointeeCounterReport`
export const ApiCounterReport_URL = (fromDate, toDate) => {
    let ApiCounterReportUrl = `${AppointeeReports}/ApiCounterReport`
    if (fromDate && toDate) {
        ApiCounterReportUrl = `${ApiCounterReportUrl}?FromDate=${fromDate}&ToDate=${toDate}`;
    }
    return ApiCounterReportUrl
};
export const PassbookDetails_URL = `${AppoienteeWorkFlow}/GetPassbookDetails?AppointeeId=`;


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

export const RemoveAdminUser_URL = (id, userId) => `${Users}/RemoveAdminUser?id=${id}&userId=${userId}`;

//Apis urls

//Models messages starts
export const approveConfirmation = `Candidate has not successfully completed verification process. Do you still want to approve?`;
export const uploadSizeErrorMsg = `File upload size limit has exceeded`;
export const uploadFormatErrorMsg = `Upload valid formated file`;
export const verificationConfirmationMsg = `Are you sure you want to start the process?`;
export const appointeerejetionConfirmationMsg = `Are you sure you want to reject?`;
export const verificationRemiderMsg = `Reminder alert will be sent to appointee, asking them to complete the verification process. Do you want to continue?`;
export const appointeeTerminationConfirmationMsg = `Do you want to terminate the process?`;
export const notProcessedDataVerificationConfirmationMsg = `Do you want to send verification portal link to the appointees? [Note: Appointees will be removed from this page and moved to the "Processing" page]`;
export const submitConfirmationMsg = `Your data will be submitted, you will no longer be able to verify your data. To re verify your data you have to contact the admin`;
export const epfoPassfileUploadeConfirmationMsg = `Please upload your trust epfo passbook before submition`;
export const visafileUploadeConfirmationMsg = `You must upload your visa before submition`;
export const registrationSuccessDialogContentText = `Your Aadhar & UAN details  has been verified and submited successfully. you have completed your verification process. Please wait for the hr to reply for further processing of your application`;
export const welcomeMsg = `Welcome to VERIDATA, the onboarding assistant for you . You are requested to enter the details requested by following the instructions one step at a time, to start your verification process click "Verify"`;
export const congratulationDialogContentTitle = `Congratulatoins!👍`;
export const useCodeEmptyMsg = `User code cant not be empty`;
export const passwordEmptyMsg = `Password cant not be empty`;
export const invalidPasswordPatternMsg = `Password should contain atleast one special character, one lower case and one upper case character, one number of minlength 8 and maxlength 15`;
export const remarksEmptyMsg = `Remarks cant not be empty`;
export const otpToMailMsg = `A verification code has been sent to your email address, Please check and enter `;
export const emailEmptyMsg = `Email can't not be empty`;
export const invalidEmailMsg = `Enter a valid email`;
export const contactNoEmptyMsg = `Contact no can't be empty`;
export const invalidcontactNoMsg = `Phone no should have 10 digits`;
export const roleEmptyMsg = `Role can't be empty`;
// Models messages ends

