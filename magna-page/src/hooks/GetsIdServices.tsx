
import React, { useEffect,} from 'react';
import { useDispatch} from 'react-redux';
import { setServiciosId } from '../redux/reducers/serviciosIdSlice';
import { setEquipos} from '../redux/reducers/equipSlice';
import { setProject} from '../redux/reducers/projectsSlice';
import { Equipos,ProyectosMagna} from '../types/types';
import { API_EQUIPOS,API_SERVICIOS,API_PROYECTOS} from '../constans';



export const ServiciosIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    // const serviciosId = useSelector((state: RootState) => state.serviciosId);
    // const equipos = useSelector((state: RootState) => state.equipos);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_PROYECTOS);
                const result = await response.json();
                const proyectos: ProyectosMagna[] = result;
                dispatch(setProject(proyectos));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const fetchEquipos = async () => {

            try {
                const response = await fetch(API_EQUIPOS);
                const result = await response.json();
                const equipos: Equipos[] = result;
                dispatch(setEquipos(equipos));
            } catch (error) {
                console.log(error);
            }
        }
        fetchEquipos();
    }, [dispatch]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_SERVICIOS);
                const result = await response.json();
                dispatch(setServiciosId(result));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [dispatch]);

    return <>{children}</>;
};

export default ServiciosIdProvider;
