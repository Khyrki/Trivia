import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrivaApi, requestUserInfo } from '../actions';
import SettingsButton from '../components/SettingsButton';
import loginPanel from './loginPanel.png';
import '../App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonSubmit: true,
      loginEmail: '',
      loginName: '',
    };

    this.changeState = this.changeState.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  getUserInfo(email, name) {
    const { requestUserInfoAction } = this.props;
    const hash = md5(email).toString();
    requestUserInfoAction(email, name, hash);
  }

  changeState({ target: { id, value } }) {
    const { loginEmail, loginName } = this.state;

    this.setState({ [id]: value });

    if ((loginEmail.length === 0) || (loginName.length === 0)) {
      this.setState({ buttonSubmit: true });
    } else {
      this.setState({ buttonSubmit: false });
    }
  }

  async fetchToken(email, name) {
    const { fetchAPI } = this.props;
    await fetchAPI();
    this.getUserInfo(email, name);
  }

  fields(changeState, buttonSubmit) {
    const { loginEmail, loginName } = this.state;
    return (
      <>
        <label htmlFor="loginEmail">
          Email:
          <br />
          <input
            data-testid="input-gravatar-email"
            type="text"
            placeholder="example@email.com"
            id="loginEmail"
            onChange={ changeState }
            required
          />
        </label>
        <label htmlFor="loginName">
          Nome:
          <br />
          <input
            data-testid="input-player-name"
            type="text"
            placeholder="Jogador1"
            id="loginName"
            onChange={ changeState }
            required
          />
        </label>
        <br />
        <Link to="/main-page">
          <input
            data-testid="btn-play"
            type="button"
            value="Jogar"
            className="login-button"
            onClick={ () => this.fetchToken(loginEmail, loginName) }
            disabled={ buttonSubmit }
          />
        </Link>
        <SettingsButton />
      </>
    );
  }

  render() {
    const { buttonSubmit } = this.state;
    return (
      <main>
        <article>
          <h1 className="title-main">Bem vindos ao jogo Trivia</h1>
          <p>
            Teste e aumente seus conhecimentos com milhares de perguntas,
            <br />
            perguntas no estilo cl??ssico de 4 alternativas, verdadeiro/falso,
            <br />
            bandeiras, enigmas sobre pontos tur??sticos, e muito mais.
          </p>
          <p>
            No game, o jogador pode testar os seus conhecimentos em diversas
            <br />
            categorias, como Literatura, Entretenimento, Hist??ria e Ci??ncias.
          </p>
          <h2>Coloque seu e-mail e nome para participar do jogo.</h2>
          <form className="login-form">
            { this.fields(this.changeState, buttonSubmit) }
          </form>
        </article>
        <img src={ loginPanel } alt="Painel de Login" className="login-img" />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchTrivaApi()),
  requestUserInfoAction: (email, name, hash) => (
    dispatch(requestUserInfo(email, name, hash))),
});

Login.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  requestUserInfoAction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
