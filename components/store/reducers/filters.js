import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { handleSelection } from '../utils';

export const defaultState = {
  selectedCategories: new Set(),
  selectedStatus: new Set(),
  selectedItemsType: new Set(),
  selectedCollections: new Set(),
  filterNftTitle: ''
};

const states = (state = defaultState, action) => {
    const payload = action.payload;
  switch (action.type) {    
    case getType(actions.filterCategories):
        let selectedCategories = payload.value ? handleSelection(state.selectedCategories, payload.value, payload.singleSelect) : new Set();
      return { ...state, selectedCategories};

    case getType(actions.filterStatus):
        let selectedStatus = payload.value ? handleSelection(state.selectedStatus, payload.value, payload.singleSelect) : new Set();
      return { ...state, selectedStatus};

    case getType(actions.filterItemsType):
        let selectedItemsType = payload.value ? handleSelection(state.selectedItemsType, payload.value, payload.singleSelect) : new Set();
      return { ...state, selectedItemsType};

    case getType(actions.filterCollections):
        let selectedCollections = payload.value ? handleSelection(state.selectedCollections, payload.value, payload.singleSelect) : new Set();
      return { ...state, selectedCollections};
    
    case getType(actions.filterNftTitle):
      return { ...state, filterNftTitle: action.payload};

    case getType(actions.clearFilter):
      return { 
        selectedCategories: new Set(),
        selectedStatus: new Set(),
        selectedItemsType: new Set(),
        selectedCollections: new Set(),
        filterNftTitle: ''
      };
    
    default:
      return state;
  }
};

export default states;
