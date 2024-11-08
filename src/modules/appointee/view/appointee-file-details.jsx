const { Box } = require("@mui/material");

const AppointeeFileDetails = ({ appointeeId }) => {
    const getAppointeeUploadDetails = () => {
    }

    useEffect(() => {
        getAppointeeUploadDetails();
    }, [])

    return (
        <Box>

        </Box>
    )
}

const UnWrappedAppointeeFileDetails = (props) => {
    return (
        <FullScreenModel
            headerText={"Appointee Details"}
            open={props.openView}
            fullScreen={true}
            closeModel={props.closeViewModel}
            content={<AppointeeFileDetails {...props} />}
        />
    );
};

const AppointeeFileDetailsView = UnWrappedAppointeeFileDetails;