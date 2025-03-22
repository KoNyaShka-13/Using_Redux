import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',// Статус загрузки фильтров
    activeFilter: 'all'// Активный фильтр (по умолчанию 'all' — все герои)
    
}

const heroesSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        FilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
        
    }
});

const {actions, reducer} = heroesSlice;//Выше настроили слайсер, а тут его разделили, чтобы редьюсер поместить в дальнейшем в главную функцию по созданию стора

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    FilterChanged
} = actions;


//        case 'ACTIVE_FILTER_CHANGED':
//            return {
//                ...state,
//                activeFilter: action.payload,
//                //filteredHeroes: action.payload === 'all' ? //filteredHeroes обновляется в зависимости от нового активного фильтра: Если фильтр 'all', то filteredHeroes равен всему списку героев.Иначе фильтруются герои, у которых element совпадает с новым активным фильтром.
//                //                state.heroes :
//                //                state.heroes.filter(item => item.element === action.payload)
//            }
//            default: return state
//    }
//}
//
//export default filters;