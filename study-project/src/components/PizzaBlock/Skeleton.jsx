import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={400}
    viewBox="0 0 280 400"
    backgroundColor="#cfc9c9"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="245" y="75" rx="0" ry="0" width="13" height="0" /> 
    <circle cx="79" cy="73" r="71" /> 
    <rect x="8" y="150" rx="3" ry="3" width="139" height="27" /> 
    <rect x="10" y="234" rx="3" ry="3" width="65" height="23" /> 
    <rect x="83" y="234" rx="3" ry="3" width="62" height="23" /> 
    <rect x="9" y="185" rx="3" ry="3" width="137" height="42" />
  </ContentLoader>
)

export default Skeleton;