type AgentPulseProps = {
    size?: "small" | "medium" | "large";
    color?: "blue" | "green" | "yellow" | "red";
}
const AgentPulse = ({size = "medium", color = "red"}: AgentPulseProps) => {
  const sizeClasses = {
    small: "w-2 h-2",
    medium: "w-4 h-4",
    large: "w-6 h-6",
  }
  
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  }
  
    return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}></div>
  )
}

export default AgentPulse
