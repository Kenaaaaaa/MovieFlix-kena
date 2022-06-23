import React,{useState} from 'react';
import {Box, Button, CircularProgress, Grid,  Typography } from '@mui/material';
import { useHistory, useParams} from 'react-router-dom';
import { ArrowBack, NestCamWiredStandTwoTone } from '@mui/icons-material';

import useStyles from './styles';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import Pagination from '../Pagination/Pagination';

import { MovieList} from '..';


//use params to get the actor id
// you have to make a new call using Redux Toolkit Query->get actor details call
//research tmdb api docs.
//use newly created hook useGetActorHoo to get actor`s info to the compoenent
//you can display using material ui

const Actors = () => {
    const {id} =useParams();
    const history = useHistory();
    const classes= useStyles();
  const[page,setPage] = useState(1);
    const {data, isFetching, error} = useGetActorsDetailsQuery(id);
  const {data:movies} =useGetMoviesByActorIdQuery({id, page});
    if (isFetching) {
      return (
        <Box display="flex" justifyContent="center" >
          <CircularProgress size="rem" />
        </Box>
      );
    }

    if(error){
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
        Go Back
            </Button>
           </Box>
     );
    }

  return (
    <>
      <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
      <img 
    className={classes.image}
    src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
    alt={data.name}
      />
      </Grid>
    <Grid item lg={7} xl={8} style={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
    <Typography variant="h2" gutterBottom>
{data?.name}
    </Typography>
    <Typography variant="h5" gutterBottom>
    Born : {new Date(data?.birthday).toDateString()}
    </Typography>
    <Typography variant="body1" align="justify" paragraph>
      {data?.biography || 'Sorry for the inconvenience, no biography is available' }
    </Typography>
    <Box marginTop="2rem" display="flex" justifyContent="space-around">
      <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
      IMDB
      </Button>
      <Button startIcon={<ArrowBack />} onClick={() => history.goBack() } color="primary">
    Back
      </Button>
    </Box>
    </Grid>
      </Grid>
      <Box margin='2rem 0'>
      <Typography variant="h2" gutterBottom align="center">
    Movies
      </Typography>
      {movies && <MovieList  movies={movies} numberOfMovies={12}/>}
      <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages}/>
      </Box>
    </>
  );
};

export default Actors;