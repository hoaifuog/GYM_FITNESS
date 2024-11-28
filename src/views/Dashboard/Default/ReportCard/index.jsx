import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';

// ==============================|| REPORT CARD ||============================== //

const ReportCard = ({ primary, secondary, iconPrimary, color, footerData, iconFooter, path, image }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Button
      onClick={() => navigate(path)}
      sx={{
        width: '100%',
        height: '100%', // Đảm bảo nút chiếm toàn bộ chiều cao của thẻ
        padding: 0,
        textTransform: 'none',
        backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${image})`, // Sử dụng hình ảnh làm nền
        backgroundSize: 'cover', // Đảm bảo hình nền bao phủ toàn bộ nút
        backgroundPosition: 'center', // Căn giữa hình nền
        '&:hover': { backgroundColor: theme.palette.action.hover },
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        overflow: 'hidden',
      }}
    >
      <Card
        sx={{
          width: '100%',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: color,
          opacity: 0.7, // Để hình nền nút hiển thị rõ hơn
          '&:hover': {
            boxShadow: theme.shadows[4],
            opacity: 1,
          },
        }}
      >
        <CardContent sx={{ padding: theme.spacing(3) }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {iconPrimary && <Box sx={{ color: 'white', fontSize: '2rem', marginRight: 1 }}>{iconPrimary}</Box>}
                <Typography variant="h3" sx={{ color: 'white'}}>
                  {primary}
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ marginTop: theme.spacing(1), color: 'black', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica' }}>
                {secondary}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {footerData && (
          <Box sx={{ backgroundColor: color }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{
                textAlign: 'center',
                padding: theme.spacing(1.2),
                color: theme.palette.common.white,
              }}
            >
              <Grid item>
                <Typography variant="body2">{footerData}</Typography>
              </Grid>
              <Grid item>{iconFooter && <Box sx={{ color: 'white', fontSize: '1.5rem' }}>{iconFooter}</Box>}</Grid>
            </Grid>
          </Box>
        )}
      </Card>
    </Button>
  );
};

ReportCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  iconPrimary: PropTypes.element,
  footerData: PropTypes.string,
  iconFooter: PropTypes.element,
  color: PropTypes.string,
  path: PropTypes.string.isRequired,
  image: PropTypes.string, // Thêm thuộc tính image
};

export default ReportCard;
