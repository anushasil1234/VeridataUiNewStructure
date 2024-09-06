
import { Box, InputBase } from '@mui/material';

import { Stack } from '@mui/material';
import InteractiveList from '../interactive-list/interactive-list';
import { useSelector } from 'react-redux';
import { interactiveListCustomeStyle, searchIconWrapperStyle, searchInputBaseStyle, searchInputContainer, searchStyle } from 'app';
import { noRecordsMsg } from 'shared/constants/constants';
import { GetAttribute } from '..';
import { Search } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';


export default function SearchAppBar() {

    const apiSlice = useSelector(state => state.apiSlice);
    const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
    const popUpSlice = useSelector(state => state.popUpSlice);

    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
    const { postAppointeeSearch } = apiSlice[0];
    const { navigateTo } = commonHooksFunctionSlice[0];

    const [searchInput, setSearchInput] = useState("");
    const [flexDirection, setFlexDirection] = useState("row");
    const [searchedList, setSearchedList] = useState();
    const [searchResponse, setSearchResponse] = useState();
    const clearSearch = () => {
        setSearchInput("");
    }
    const handleSearch = async () => {
        if (searchInput && searchInput.length >= 2) {
            const response = await postAppointeeSearch(searchInput);
            if (response) {
                const { responseInfos } = response;
                if (responseInfos && responseInfos.length > 0) {

                    setSearchResponse(responseInfos);
                    const searcheList = responseInfos.map((({ appointeeName, candidateId, pathName }) => {
                        return { primaryText: `${appointeeName} (${candidateId})`, secondaryText: pathName }
                    }))
                    setSearchedList(searcheList)
                } else {
                    showErrorMessage(noRecordsMsg);
                    clearSearch();
                }
            }
        }
    }
    const handleChangeInInput = ({ target }) => {
        const { value } = target;
        setSearchInput(value);
    }

    const keyDownHandler = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    document.onkeydown = keyDownHandler
    const handleClickOnSearchlist = (element) => {
        const currentSearchListIndex = GetAttribute(element, "index");
        const { appointeeName, candidateId, appointeePath } = searchResponse[currentSearchListIndex];
        navigateTo(appointeePath, { state: { appointeeName, candidateId } })
        setSearchedList();
        clearSearch();
    }
    useEffect(() => {
        if (searchInput.length > 0) {
            setFlexDirection("row-reverse")
        } else {
            setFlexDirection("row")
        }
    }, [searchInput])

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSearchedList("")
                    setSearchInput("")
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    return (
        <Box ref={wrapperRef} sx={{ flexGrow: 1, position: "relative" }}>
            <Box sx={searchStyle}>
                <Stack sx={{ ...searchInputContainer, flexDirection }}>
                    <Box sx={searchIconWrapperStyle} onClick={handleSearch}>
                        <Search sx={{ cursor: "pointer" }} />
                    </Box>
                    <InputBase
                        sx={searchInputBaseStyle}
                        placeholder="Search Name/CandidateId"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleChangeInInput}
                        value={searchInput}
                    />
                </Stack>
            </Box>
            {searchedList && searchedList.length > 0 ?
                (<InteractiveList
                    customeStyle={interactiveListCustomeStyle}
                    list={searchedList}
                    handleClickOnlist={handleClickOnSearchlist}
                />) : null}

        </Box>
    );
}
