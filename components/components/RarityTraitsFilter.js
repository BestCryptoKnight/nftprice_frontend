import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { categories, status, itemsType, collections } from './constants/filters';
import { filterCategories, filterStatus, filterItemsType, filterCollections } from '../../components/store/actions';

const traits = [
    {
        title: "Ear",
        data: ["Demon Ears", "Ears", "Elf Ears", "No Ears"]
    },
    {
        title: "Ear",
        data: ["Demon Ears", "Ears", "Elf Ears", "No Ears"]
    },
    {
        title: "Ear",
        data: ["Demon Ears", "Ears", "Elf Ears", "No Ears"]
    },
    {
        title: "Ear",
        data: ["Demon Ears", "Ears", "Elf Ears", "No Ears"]
    }

]


const TraitList = (props) => {
    return (
        <div className="accordion" id="accordionPanelsStayOpenExample">
            {props.traits.map((trait, index) => {
                return <>
                    <div className="accordion-item" id={index}>
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                {trait.title}
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <div className="list-group">
                                    {trait.data.map((item, index) => (
                                        <button key ={index}type="button" className="list-group-item list-group-item-action">{item}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            })}
        </div>
    );
}



const RarityTraitsFilter = () => {
    const dispatch = useDispatch();

    const handleCategory = useCallback((event) => {
        const { id } = event.target;
        dispatch(filterCategories({ value: id, singleSelect: false }));
    }, [dispatch]);

    const handleStatus = useCallback((event) => {
        const { id } = event.target;
        dispatch(filterStatus({ value: id, singleSelect: false }));
    }, [dispatch]);

    const handleItemsType = useCallback((event) => {
        const { id } = event.target;
        dispatch(filterItemsType({ value: id, singleSelect: false }));
    }, [dispatch]);

    const handleCollections = useCallback((event) => {
        const { id } = event.target;
        dispatch(filterCollections({ value: id, singleSelect: false }));
    }, [dispatch]);

    return (
        <>
            <TraitList traits={traits}/>


            {/* <div className="item_filter_group">
                <h4>Select Categories</h4>
                <div className="de_form">
                    {categories.map((item, index) => (
                        <div className="de_checkbox" key={index}>
                            <input
                                id={item.value}
                                name={item.value}
                                type="checkbox"
                                value={item.value}
                                onChange={handleCategory}
                            />
                            <label htmlFor={item.value}>{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="item_filter_group">
                <h4>Status</h4>
                <div className="de_form">
                    {status.map((item, index) => (
                        <div className="de_checkbox" key={index}>
                            <input
                                id={item.value}
                                name={item.value}
                                type="checkbox"
                                value={item.value}
                                onChange={handleStatus}
                            />
                            <label htmlFor={item.value}>{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="item_filter_group">
                <h4>Items Type</h4>
                <div className="de_form">
                    {itemsType.map((item, index) => (
                        <div className="de_checkbox" key={index}>
                            <input
                                id={item.value}
                                name={item.value}
                                type="checkbox"
                                value={item.value}
                                onChange={handleItemsType}
                            />
                            <label htmlFor={item.value}>{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="item_filter_group">
                <h4>Collections</h4>
                <div className="de_form">
                    {collections.map((item, index) => (
                        <div className="de_checkbox" key={index}>
                            <input
                                id={item.value}
                                name={item.value}
                                type="checkbox"
                                value={item.value}
                                onChange={handleCollections}
                            />
                            <label htmlFor={item.value}>{item.label}</label>
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    );
}

export default memo(RarityTraitsFilter)