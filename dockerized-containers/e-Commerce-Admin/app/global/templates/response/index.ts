class ResponseTemplate {
  static general(data) {
    return data;
  }
  static error(code, message, description) {
    return {
      statusCode: code || 400,
      message: message || 'some error occoured',
      description: description || 'error occoured on server, please try again after some time.'
    };
  }
  static authError() {
    return this.error(
      403,
      'authentication error',
      'no authentication token provided, please login first and provide the authentication token.'
    );
  }
  static invalidAuthError() {
    return this.error(
      403,
      'authentication error',
      'invalid Token provided, please login first and provide the authentication token.'
    );
  }
  static emptyContent() {
    return this.general({
      statusCode: 402,
      message: 'empty content found',
      description: 'you must provide valid data and it must not be empty.',
      helpful_links: ['http://stackoverflow.com/questions/18419428/what-is-the-minimum-valid-json']
    });
  }
  static invalidContentType() {
    return this.general({
      statusCode: 400,
      message: 'invalid content type',
      description: 'you must specify content type and it must be application/json',
      helpful_links: ['http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type']
    });
  }
  static routeNotFound() {
    return this.error(
      405,
      'resource not found',
      'the resource your tried to access doesn\'t exist or you dont have permissions to access it.'
    );
  }
  static userNotFound() {
    return this.error(
      400,
      'user not found',
      "the user you're looking for doesn't exist or you dont have permissions to access it."
    );
  }
  static updateErrorOccoured(error) {
    return this.error(
      301,
      'error occoured',
      error || 'error occoured while updating your data.'
    );
  }
  static success(description, data=null) {
		return {
			statusCode: 200,
			message: 'success',
			description: description || 'data successfully saved.',
			...data
		}
	}
}

export default ResponseTemplate;

