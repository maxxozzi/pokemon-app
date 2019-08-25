import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
    return (
        <Container maxWidth="md">
          <Typography variant="body2" style={{color: '#95a5a6'}} align="center">
            {'© '}
            <span style={{fontWeight: 'bold'}}>
              Taufik Sudarmadi
            </span>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Container>
    );
}