import React, { memo, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
const Select = dynamic(() => import('react-select'), { ssr: false });

const TopFilterBar = ({ setSide, setOwner }) => {

    const [address, setAddress] = useState();

    const handleSide = useCallback((option) => {
        const { value } = option;
        setSide(value);
    }, [setSide]);
    const handleOwners = useCallback((option) => {
        const { value } = option;
        setOwner(value);
    }, [setOwner]);

    const sides = [
        {
            value: 0,
            label: 'Buy Order'
        },
        {
            value: 1,
            label: 'Sell Order'
        }
    ];

    const owners = [
        {
            value: 0,
            label: 'Created by me'
        },
        {
            value: 1,
            label: 'Owned by me'
        }
    ]

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

    const getAddress = async () => {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAddress(addressArray[0]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAddress();
    }, [getAddress]);

    return (
        <div className="items_filter">
            <div className='dropdownSelect one'>
                <Select 
                    styles={customStyles} 
                    menuContainerStyle={{'zIndex': 999}}
                    options={[defaultValue, ...sides]}
                    onChange={handleSide}
                />
            </div>
            { address &&
                <div className='dropdownSelect one'>
                    <Select 
                        styles={customStyles} 
                        menuContainerStyle={{'zIndex': 999}}
                        options={[defaultValue, ...owners]}
                        onChange={handleOwners}
                    />
                </div>
            }
        </div>
    );
}

export default memo(TopFilterBar);