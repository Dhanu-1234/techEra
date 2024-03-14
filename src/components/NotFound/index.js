import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="failure-img"
      />
      <h1 className="failure-heading">Page Not Found</h1>
      <p className="failure-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
