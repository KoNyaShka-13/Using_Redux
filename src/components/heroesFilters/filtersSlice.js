import {useHttp} from '../../hooks/http.hook';//Чтобы сделать запрос
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',// Статус загрузки фильтров
    activeFilter: 'all'// Активный фильтр (по умолчанию 'all' — все герои)
    
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        //filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        //filtersFetched: (state, action) => {
        //    state.filtersLoadingStatus = 'idle';
        //    state.filters = action.payload;
        //},
        //filtersFetchingError: state => {
        //    state.filtersLoadingStatus = 'error';
        //},
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
        
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
                .addCase(fetchFilters.fulfilled, (state, action) => {
                    state.filtersLoadingStatus = 'idle';
                    state.filters = action.payload;
                })
                .addCase(fetchFilters.rejected, state => {
                    state.filtersLoadingStatus = 'error';
                })
                .addDefaultCase(() => {})
        }
});

const {actions, reducer} = filtersSlice;//Выше настроили слайсер, а тут его разделили, чтобы редьюсер поместить в дальнейшем в главную функцию по созданию стора

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged
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