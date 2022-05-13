class BadRequestError extends Error {
  url: string
  data: any
  protected identifier: any

  constructor(errorData) {
    super(errorData.message)
    this.url = errorData.url
    this.data = errorData.data

    if (errorData.identifier) {
      this.identifier = errorData.identifier
    }
  }
}

export default BadRequestError
