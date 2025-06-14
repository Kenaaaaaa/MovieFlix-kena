import React, { useState, useEffect} from 'react';
import{ Box, CircularProgress, useMediaQuery, Typography} from '@mui/material';
import { useSelector} from 'react-redux';
import {selectGenreOrCategory} from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMDB';
import Pagination from '../Pagination/Pagination';
import { MovieList, FeaturedMovie} from '..';




const Movies = () => {
  const [page, setPage] = useState(1);
  const {genreIdOrCategoryName, searchQuery} = useSelector((state) => state.currentGenreOrCategory);

    const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery });
  
    const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
    const numberOfMovies = lg ? 17 : 19;
    if(isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>

    );
  };


  if(!data.results.length){
    return(
      <Box display="flex" alignItems="center" mt="20px">
  <Typography variant="h4">
  No Movies that match your name.
  <br />
  Please search for another movie...
   </Typography>
      </Box>
    );
  }
  
  if(error) return 'An error has occurred';

  return (
    <div>
    <FeaturedMovie movie={data.results[0]}/>
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
    </div>
  );
};

export default Movies;
