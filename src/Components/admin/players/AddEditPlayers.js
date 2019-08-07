import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/FormFields';
import ImageUploader from '../../ui/ImageUploader';
import { validate } from '../../ui/misc';
import { firebasePlayers, firebaseDB, firebase } from '../../../firebase';

class AddEditPlayers extends Component {
  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'First Name',
          name: 'name',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Last Name',
          name: 'lastname',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Number',
          name: 'number',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Position',
          name: 'position',
          type: 'select',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defender', value: 'Defender' },
            { key: 'Midfielder', value: 'Midfielder' },
            { key: 'Forward', value: 'Forward' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = {
      ...this.state.formData,
    };
    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }
    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData,
    });
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({
        formType: 'Add Player',
      });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val();
          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, 'Edit Player', url);
            })
            .catch(e => {
              this.updateFields(
                {
                  ...playerData,
                  image: '',
                },
                playerId,
                'Edit Player',
              );
            });
        });
    }
  }

  updateForm(element, content = '') {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };
    if (content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData,
    });
  }

  successForm = message => {
    this.setState({
      formSuccess: message,
    });
    setTimeout(() => {
      this.setState({
        formSuccess: '',
      });
    }, 2000);
  };

  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit Player') {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated successfully');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/players');
          })
          .catch(() => {
            this.setState({
              formError: true,
            });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData['image'].value = '';
    newFormData['image'].valid = false;
    this.setState({
      defaultImg: '',
      formData: newFormData,
    });
  };

  storeFileName = fileName => {
    this.updateForm({ id: 'image' }, fileName);
  };
  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>

          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <ImageUploader
                dir="players"
                tag={'Player Image'}
                defaultImg={this.state.defaultImg}
                defaultImageName={this.state.formData.image.value}
                resetImage={() => this.resetImage()}
                fileName={fileName => this.storeFileName(fileName)}
              />
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'lastname'}
                formData={this.state.formData.lastname}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'number'}
                formData={this.state.formData.number}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'position'}
                formData={this.state.formData.position}
                change={element => this.updateForm(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something went wrong</div>
              ) : null}

              <div className="admin_submit">
                <button onClick={event => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
