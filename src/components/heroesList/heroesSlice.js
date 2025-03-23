import {useHttp} from '../../hooks/http.hook';//Чтобы сделать запрос
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { heroCreated, heroDeleted, heroesFetching, heroesFetchingError } from "../../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        //heroesFetching: state => {state.heroesLoadingStatus = 'loading'},//Они сейчас находятся в экстраредьюсерах, по этому можно их удалять и отсюда и из индекса
        //heroesFetched: (state, action) => {
        //    state.heroesLoadingStatus = 'idle';
        //    state.heroes = action.payload;
        //},
        //heroesFetchingError: state => {
        //    state.heroesLoadingStatus = 'error';
        //},
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;//Выше настроили слайсер, а тут его разделили, чтобы редьюсер поместить в дальнейшем в главную функцию по созданию стора

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;
