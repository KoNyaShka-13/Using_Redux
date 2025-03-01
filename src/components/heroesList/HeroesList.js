import {useHttp} from '../../hooks/http.hook';//Чтобы сделать запрос
import { useEffect, useCallback } from 'react';//Чтобы сделать запрос вовремя
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './HeroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);//Хук, вытягиваем кусок кода для работы
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    // Удаление персонажа по его id
    const onDelete = useCallback(async (id) => {//У нас и мемоизация(useCallback) и безопасность при async/awit
        try {
            await request(`http://localhost:3001/heroes/${id}`, "DELETE");
            dispatch(heroDeleted(id));
        } catch (e) {
            console.error("Ошибка при удалении персонажа", e);
        }
    }, [request]);
    

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <CSSTransition
                        timeout={0}
                        classNames={"hero"}>
                <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>
        }

        return arr.map(({id, ...props}) => {
            return <CSSTransition
                        key={id}
                        timeout={500}
                        classNames="hero">
                <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
            </CSSTransition>
        })
    }

    const elements = renderHeroesList(filteredHeroes);//Оборачиваем в TransitionGroup, чтобы работала анимация из CSSTransition
    return (
        <TransitionGroup component={"ul"}>
            {elements}
        </TransitionGroup>
            
        
    )
}

export default HeroesList;