import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAdminUserDetails } from 'server/apis';
import ActionPermission from 'shared/components/action-permission/action-permission';
import { toCreateUser, userListTableHeadCell } from 'shared/constants/constants';
import { CardLayout, DataTable, PageLayout, generateTableRowData } from 'shared/utils'
import Button1 from 'shared/utils/button/button1';

const UnwrappedUserListView = (props) => {
    const { hasPermission } = props;

    const apiSlice = useSelector(state => state.apiSlice);
    const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

    const [rows, setRows] = useState([]);

    // const { getAdminUserDetails } = apiSlice[0];

    const setTableRows = async () => {
        const response = await getAdminUserDetails();
        if (response) {
            const { responseInfos } = response;
            let generatedCells = generateTableRowData(responseInfos, userListTableHeadCell, null, hasPermission, setTableRows);
            setRows({
                tableHead: userListTableHeadCell,
                tableRows: generatedCells
            });
        }
    }

    const { navigateTo } = commonHooksFunctionSlice[0];

    useEffect(() => {
        if (hasPermission) {
            setTableRows();
        }
    }, [hasPermission]);
    return (
        <PageLayout pageName={"User list"}>
            <CardLayout>
                <Button1 onClick={() => navigateTo(toCreateUser)} sx={{ marginLeft: "5px" }}>Create User</Button1>
                <DataTable
                    rows={rows}
                    setRows={setRows}
                    headCells={userListTableHeadCell}

                />
            </CardLayout>
        </PageLayout>
    )
}
const UserListView = ActionPermission(UnwrappedUserListView);
export default UserListView