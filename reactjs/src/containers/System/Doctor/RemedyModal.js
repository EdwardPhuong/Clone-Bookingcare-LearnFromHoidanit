import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

import "./RemedyModal.scss";
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			imgBase64: "",
		};
	}

	async componentDidMount() {
		if (this.props.dataModal) {
			this.setState({
				email: this.props.dataModal.email,
			});
		}
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.dataModal !== this.props.dataModal) {
			this.setState({ email: this.props.dataModal.email });
		}
	}

	handleOnChangeEmail = (event) => {
		this.setState({ email: event.target.value });
	};

	handleOnChangeImgage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			this.setState({
				imgBase64: base64,
			});
		}
	};

	handleSendRemedy = () => {
		this.props.sendRemedy(this.state);
	};

	render() {
		let { language, isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
		return (
			<Modal
				isOpen={isOpenModal}
				className={"booking-modal-container modal-dialog-centered"}
				size="lg"
				centered
			>
				<div className="modal-header">
					<h5 className="modal-title">Gui Hoa Don Kham Benh</h5>
					<button
						type="button"
						className="close"
						aria-label="Close"
						onClick={closeRemedyModal}
					>
						<span aria-hidden="true">x</span>
					</button>
				</div>
				<ModalBody>
					<div className="row">
						<div className="col-6 form-group">
							<label>Email Patient</label>
							<input
								className="form-control"
								type="email"
								value={this.state.email}
								onChange={(event) => this.handleOnChangeEmail(event)}
							/>
						</div>
						<div className="col-6 form-group">
							<label>Chon File Hoa Don</label>
							<input
								className="form-control-file"
								type="file"
								onChange={(event) => this.handleOnChangeImgage(event)}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => this.handleSendRemedy()}>
						Send
					</Button>
					<Button color="secondary" onClick={closeRemedyModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		genderRedux: state.admin.genders,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
