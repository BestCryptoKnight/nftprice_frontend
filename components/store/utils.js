
export const initEntityState = (initialValue, loading = true) => ({
    loading,
    data: initialValue,
    loadFailed: false,
    canceler: null
  });
  
  export const entityLoadingStarted = (state, canceler) => ({
    ...state,
    canceler,
    loading: true,
    loadFailed: false
  });
  
  export const entityLoadingSucceeded = (state, data) => ({
    ...state,
    data,
    loading: false,
    loadFailed: false,
    canceler: null
  });
  
  export const entityLoadingFailed = (state) => ({
    ...state,
    loading: false,
    loadFailed: true,
    canceler: null
  });

  export const handleSelection = (selectedIds, selectId, singleSelect = false) => {

    const selected = new Set(selectedIds || []);
    
    if(singleSelect) return new Set([selectId]);

    if (selected.has(selectId)) {
      selected.delete(selectId);
    } else {
      selected.add(selectId);
    }
  
    return selected;
  };

  export const shuffleArray = (array) => {
    let shuffeled = array;

    for (let i = shuffeled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffeled[i], shuffeled[j]] = [shuffeled[j], shuffeled[i]];
    }

    return shuffeled;
  }