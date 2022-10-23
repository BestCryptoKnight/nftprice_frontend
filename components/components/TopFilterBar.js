import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { categories, status, itemsType } from './constants/filters';
import { filterCategories, filterStatus, filterItemsType, filterNftTitle } from '../../components/store/actions';
import dynamic from 'next/dynamic'
const Select = dynamic(() => import('react-select'), { ssr: false });

const TopFilterBar = () => {
    const dispatch = useDispatch();
    const handleCategory = useCallback((option) => {
        const { value } = option;
        dispatch(filterCategories({value, singleSelect: true}));
    }, [dispatch]);
    
    const handleStatus = useCallback((option) => {
        const { value } = option;
        dispatch(filterStatus({value, singleSelect: true}));
    }, [dispatch]);
    
    const handleItemsType = useCallback((option) => {
        const { value } = option;
        dispatch(filterItemsType({value, singleSelect: true}));
    }, [dispatch]);

    const filterNftTitles = useCallback((event) => {
        const value = event.target.value;
        dispatch(filterNftTitle(value));
    }, [dispatch]);

    const defaultValue = {
        value: null,
        label: 'Select Filter'
    };
    
    const customStyles = {
        option: (base, state) => ({
            ...base,
            background: "#fff",
            color: "#333",
            borderRadius: state.isFocused ? "0" : 0,
            "&:hover": {
                background: "#eee",
            }
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            padding: 0
        }),
        control: (base, state) => ({
            ...base,
            padding: 2
        })
    };

    return (
        <div className="items_filter">
            <form className="row form-dark" id="form_quick_search" name="form_quick_search">
                <div className="col">
                    <input 
                        className="form-control" 
                        id="name_1" 
                        name="name_1" 
                        placeholder="search item here..." 
                        type="text"
                        onChange={filterNftTitles}
                    /> 
                    <button id="btn-submit">
                        <i className="fa fa-search bg-color-secondary"></i>
                    </button>
                    <div className="clearfix"></div>
                </div>
            </form>
            <div className='dropdownSelect one'>
                <Select 
                    styles={customStyles} 
                    menuContainerStyle={{'zIndex': 999}}
                    options={[defaultValue, ...categories]}
                    onChange={handleCategory}
                />
            </div>
            <div className='dropdownSelect two'>
                <Select 
                    styles={customStyles} 
                    options={[defaultValue,...status]}
                    onChange={handleStatus}
                />
            </div>
            <div className='dropdownSelect three'>
                <Select 
                    styles={customStyles}
                    options={[defaultValue, ...itemsType]}
                    onChange={handleItemsType}
                />
            </div>
        </div>
    );
}

export default memo(TopFilterBar);