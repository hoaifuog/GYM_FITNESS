import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project import
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

import image1 from 'assets/images/blog.png'
import image2 from 'assets/images/Exercises.png'
import image3 from 'assets/images/feedback.png'
import image4 from 'assets/images/training.png'
import image5 from 'assets/images/comment.png'
import image6 from 'assets/images/plan.png'
// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={gridSpacing + 2} /* Tăng spacing để các ô thoáng hơn */>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing + 2}>
          {/* Mỗi ô chiếm nhiều không gian hơn với lg={4} */}
          <Grid item lg={4} sm={6} xs={12} >
            <ReportCard secondary="Blog"  path="/post-management" image ={image1}/>
            
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ReportCard secondary="Exercises"  path="/exercise-management" image={image2} />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ReportCard secondary="Feedback"  path="/feedback-management" image={image3} />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ReportCard secondary="Training"  path ="/training-management" image={image4}/>
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ReportCard secondary="Comment"  path ="/comment-management" image={image5} />      
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ReportCard secondary="Plan"  path ="/plan-management" image={image6} />           
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Default;
