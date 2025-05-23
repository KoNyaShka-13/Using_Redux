import {useHttp} from '../../hooks/http.hook';//Чтобы сделать запрос
import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const filtersAdapter = createEntityAdapter();//Эта функция должна вернуть объект, у которого будут свои методы, коллбэки и тп.

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
        
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
                .addCase(fetchFilters.fulfilled, (state, action) => {
                    state.filtersLoadingStatus = 'idle';
                    filtersAdapter.setAll(state, action.payload);
                })
                .addCase(fetchFilters.rejected, state => {
                    state.filtersLoadingStatus = 'error';
                })
                .addDefaultCase(() => {})
        }
});

const {actions, reducer} = filtersSlice;//Выше настроили слайсер, а тут его разделили, чтобы редьюсер поместить в дальнейшем в главную функцию по созданию стора

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);


export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged
} = actions;


