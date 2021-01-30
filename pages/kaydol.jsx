import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Alert } from 'reactstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { signUpRequest } from '../lib/auth/actions';
import { setErrorRequest } from '../lib/error/actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link href="/">
        <a>Saalla</a>
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp(props) {
  useEffect(() => {
    return () => {
      props.clearErrors();
    };
  }, []);
  const [payload, setPayload] = useState({
    username: '',
    emailAddress: '',
    password: '',
    policy: false,
    gender: ''
  });
  const [errors, setErrors] = useState({ email: false, username: false });

  const handleInputChange = ({ currentTarget: input }) => {
    if (input.id === 'emailAddress') {
      validateEmail(input.value);
    }
    const currentValues = payload;
    currentValues[input.id] = input.value;
    setPayload(currentValues);
  };

  const handleUsername = (e) => {
    payload.username = e.target.value;
    setPayload(payload);
    validateUsername(e.target.value);
  };

  const onselectChange = (e) => {
    setPayload({ ...payload, gender: e.target.value });
  };

  const handleCheck = () => {
    setPayload({ ...payload, policy: !payload.policy });
  };

  const validateEmail = (email) => {
    var reg = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}');
    let newErrors = { ...errors };
    newErrors.email = !reg.test(email);
    setErrors(newErrors);
  };

  const validateUsername = (username) => {
    var reg = new RegExp(
      '^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
    );
    let newErrors = { ...errors };
    newErrors.username = !reg.test(username);
    setErrors(newErrors);
  };

  const classes = useStyles();

  const handleSubmit = () => {
    const newPayload = { ...payload };
    if (newPayload.gender == '') newPayload.gender = 'N';
    const { signUp } = props;
    signUp(newPayload);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kayıt ol
        </Typography>
        {props && props.errors && props.errors.emailError ? (
          <Alert color="danger">Bu E-Posta daha önce alınmış</Alert>
        ) : props.errors.usernameError ? (
          <Alert color="danger">Bu kullanıcı adı daha önce alınmış</Alert>
        ) : null}
        <Grid container spacing={2}>
          {/* {error && <Alert color="danger">{errorValue}</Alert>} */}
          <Grid item xs={12}>
            <TextField
              onChange={handleUsername}
              variant="outlined"
              required
              fullWidth
              id="username"
              error={errors.username}
              helperText={errors.username && 'Gecersiz kullanici adi'}
              label="Kullanici Adi"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              required
              error={errors.email}
              helperText={errors.email && 'Lütfen e-postayı sallamayın'}
              fullWidth
              id="emailAddress"
              label="E-Posta"
              name="emailAddress"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-outlined-label">
              Cinsiyet
            </InputLabel>
            <Select
              style={{ width: '50%' }}
              labelId="demo-simple-select-outlined-label"
              id="gender"
              value={payload.gender}
              onChange={onselectChange}
              label="Age"
            >
              <MenuItem value="E">Erkek</MenuItem>
              <MenuItem value="K">Kadın</MenuItem>
              <MenuItem value="N">Salla Bosver</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: '15px' }} item xs={12}>
          <Checkbox
            onClick={handleCheck}
            id="policy"
            name="policy"
            color="primary"
          />
          <a href="https://saalla.com/policy" target="_blank">
            saalla kullanıcı sözleşmesini okudum ve kabul ediyorum
          </a>
        </Grid>
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
          disabled={
            errors.email ||
            errors.username ||
            !payload.emailAddress ||
            !payload.policy
          }
          className={classes.submit}
        >
          Kayıt Ol
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/giris-yap">
              <a>Hesabın var mı? Giriş Yap</a>
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (payload) => dispatch(signUpRequest(payload)),
  clearErrors: (errorType) => dispatch(setErrorRequest(errorType))
});

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
