import { docReuploadListTableHeadCell, mannualReverificationListTableHeadCell, mannualVerificationListTableHeadCell } from "shared/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { DataTable, generateTableRowData } from "shared/utils";
import { removeActionRoute } from "store/slices/action-route-slice";
import { useEffect, useState } from "react";

export const MVTable = (filters) => {
  console.log('columnlist', mannualVerificationListTableHeadCell)
  const { props, payload } = filters;

  console.log("filterType", filters);
  const [rows, setRows] = useState([]);
  const [responseList, setResponseList] = useState();
  const actionRouteSlice = useSelector((state) => state.actionRouteSlice);
  const apiSlice = useSelector((state) => state.apiSlice);
  const { getMannualVerificationDataList } = apiSlice[0];
  const dispatch = useDispatch();

  const payload_MV = {
    filterType: props,
    ...payload,
  };
  console.log("actions", payload_MV);
  const setTableRows = async (payload_MV) => {
    const response = await getMannualVerificationDataList(payload_MV);
    if (response) {
      const { responseInfos } = response;
      setResponseList(responseInfos);
      let generatedCells = generateTableRowData(
        responseInfos,
        props === 'MV' ? mannualVerificationListTableHeadCell: props==='RD'? docReuploadListTableHeadCell : mannualReverificationListTableHeadCell,
        null
        //hasPermission
      );
      setRows({
        tableHead: props === 'MV' ? mannualVerificationListTableHeadCell: props==='RD'? docReuploadListTableHeadCell : mannualReverificationListTableHeadCell,
        tableRows: generatedCells,
      });
    }
  };
  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0) {
      setTableRows(payload_MV);
    }
  }, [actionRouteSlice, props, payload]);
  return (
    <DataTable
      rows={rows}
      setRows={setRows}
      headCells={props === 'MV' ? mannualVerificationListTableHeadCell: props==='RD'? docReuploadListTableHeadCell : mannualReverificationListTableHeadCell}
    />
  );
};
