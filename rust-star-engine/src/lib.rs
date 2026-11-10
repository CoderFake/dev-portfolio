#![allow(static_mut_refs)]
use std::f32::consts::PI;

const MAX_PARTICLES: usize = 500;
const MAX_AGENTS: usize = 15;
const MAX_CONNECTIONS: usize = 600;

struct LcgRng {
    state: u32,
}

impl LcgRng {
    const fn new(seed: u32) -> Self {
        Self { state: seed }
    }

    #[inline(always)]
    fn next_u32(&mut self) -> u32 {
        self.state = self.state.wrapping_mul(1664525).wrapping_add(1013904223);
        self.state
    }

    #[inline(always)]
    fn next_f32(&mut self) -> f32 {
        (self.next_u32() >> 8) as f32 * (1.0 / 16777216.0)
    }
}

pub struct SimulationState {
    particle_count: usize,
    agent_count: usize,
    max_connections: usize,
    active_line_vertices: usize,
    rng: LcgRng,

    node_positions: [f32; MAX_PARTICLES * 3],
    node_colors: [f32; MAX_PARTICLES * 3],

    agent_positions: [f32; MAX_AGENTS * 3],
    agent_colors: [f32; MAX_AGENTS * 3],
    agent_targets: [usize; MAX_AGENTS],
    agent_speeds: [f32; MAX_AGENTS],

    line_positions: [f32; MAX_CONNECTIONS * 6],
    line_colors: [f32; MAX_CONNECTIONS * 6],
}

static mut STATE: SimulationState = SimulationState {
    particle_count: 500,
    agent_count: 15,
    max_connections: 600,
    active_line_vertices: 0,
    rng: LcgRng::new(0xA61_2026),
    node_positions: [0.0; MAX_PARTICLES * 3],
    node_colors: [1.0; MAX_PARTICLES * 3],
    agent_positions: [0.0; MAX_AGENTS * 3],
    agent_colors: [1.0; MAX_AGENTS * 3],
    agent_targets: [0; MAX_AGENTS],
    agent_speeds: [0.025; MAX_AGENTS],
    line_positions: [0.0; MAX_CONNECTIONS * 6],
    line_colors: [0.0; MAX_CONNECTIONS * 6],
};

#[inline(always)]
fn mode_base_color(mode: u32) -> (f32, f32, f32) {
    match mode {
        0 => (0.753, 0.518, 0.988), // sphere: #c084fc
        1 => (0.204, 0.827, 0.600), // wave: #34d399
        2 => (0.376, 0.647, 0.980), // tunnel: #60a5fa
        3 => (0.647, 0.953, 0.988), // spiderweb: #a5f3fc
        4 => (0.984, 0.573, 0.235), // gravity: #fb923c
        5 => (0.133, 0.827, 0.933), // network: #22d3ee
        _ => (0.220, 0.741, 0.973), // agent: #38bdf8
    }
}

#[inline(always)]
fn mode_agent_color(mode: u32) -> (f32, f32, f32) {
    match mode {
        0 => (1.000, 1.000, 1.000), // #ffffff
        1 => (0.655, 0.953, 0.816), // #a7f3d0
        2 => (0.749, 0.859, 0.996), // #bfdbfe
        3 => (0.925, 0.996, 1.000), // #ecfeff
        4 => (1.000, 0.929, 0.835), // #ffedd5
        5 => (0.925, 0.996, 1.000), // #ecfeff
        _ => (0.878, 0.949, 0.996), // #e0f2fe
    }
}

#[inline(always)]
fn mode_connection_distance(mode: u32) -> f32 {
    match mode {
        0 => 6.5,
        1 => 5.5,
        2 => 4.8,
        3 => 7.8,
        4 => 5.0,
        5 => 9.0,
        _ => 6.5,
    }
}

#[no_mangle]
pub extern "C" fn init_simulation(
    particle_count: usize,
    agent_count: usize,
    max_connections: usize,
) {
    unsafe {
        let p_count = particle_count.clamp(64, MAX_PARTICLES);
        let a_count = agent_count.clamp(2, MAX_AGENTS);
        let c_count = max_connections.clamp(64, MAX_CONNECTIONS);

        STATE.particle_count = p_count;
        STATE.agent_count = a_count;
        STATE.max_connections = c_count;
        STATE.rng = LcgRng::new(0xA61_2026);

        for i in 0..p_count {
            let u = STATE.rng.next_f32();
            let v = STATE.rng.next_f32();
            let theta = u * 2.0 * PI;
            let phi = (2.0 * v - 1.0).acos();
            let r = 20.0_f32;

            let sin_phi = phi.sin();
            let x = r * sin_phi * theta.cos();
            let y = r * sin_phi * theta.sin();
            let z = r * phi.cos();

            let idx = i * 3;
            STATE.node_positions[idx] = x;
            STATE.node_positions[idx + 1] = y;
            STATE.node_positions[idx + 2] = z;

            STATE.node_colors[idx] = 1.0;
            STATE.node_colors[idx + 1] = 1.0;
            STATE.node_colors[idx + 2] = 1.0;
        }

        for i in 0..a_count {
            let target = (STATE.rng.next_u32() as usize) % p_count;
            let t_idx = target * 3;
            let idx = i * 3;

            STATE.agent_positions[idx] = STATE.node_positions[t_idx];
            STATE.agent_positions[idx + 1] = STATE.node_positions[t_idx + 1];
            STATE.agent_positions[idx + 2] = STATE.node_positions[t_idx + 2];

            STATE.agent_colors[idx] = 1.0;
            STATE.agent_colors[idx + 1] = 1.0;
            STATE.agent_colors[idx + 2] = 1.0;

            STATE.agent_targets[i] = target;
            STATE.agent_speeds[i] = 0.02 + STATE.rng.next_f32() * 0.03;
        }
    }
}

#[no_mangle]
pub extern "C" fn step_simulation(
    time: f32,
    mode: u32,
    theme_r: f32,
    theme_g: f32,
    theme_b: f32,
) -> usize {
    unsafe {
        let p_count = STATE.particle_count;
        let a_count = STATE.agent_count;
        let max_conn = STATE.max_connections;
        let p_count_f = p_count as f32;

        let (base_r, base_g, base_b) = mode_base_color(mode);
        let target_r = base_r + (theme_r - base_r) * 0.38;
        let target_g = base_g + (theme_g - base_g) * 0.38;
        let target_b = base_b + (theme_b - base_b) * 0.38;

        let (ag_base_r, ag_base_g, ag_base_b) = mode_agent_color(mode);

        let cols_wave = ((p_count_f * 1.5).sqrt()).round().max(1.0);
        let total_rows_wave = p_count_f / cols_wave;

        // 1. Update 3D Star Node Positions & Colors
        for i in 0..p_count {
            let i_f = i as f32;
            let (tx, ty, tz) = match mode {
                0 => {
                    // Sphere
                    let phi = (-1.0 + (2.0 * i_f) / p_count_f).acos();
                    let theta = (p_count_f * PI).sqrt() * phi;
                    let radius = 20.0 + (time * 1.5 + i_f * 0.1).sin() * 0.5;
                    let sin_phi = phi.sin();
                    (
                        radius * sin_phi * theta.cos(),
                        radius * sin_phi * theta.sin(),
                        radius * phi.cos(),
                    )
                }
                1 => {
                    // Wave
                    let cols_u = cols_wave as usize;
                    let row = (i / cols_u) as f32;
                    let col = (i % cols_u) as f32;
                    let x = (col - cols_wave * 0.5) * 2.4;
                    let z = (row - total_rows_wave * 0.5) * 2.4;
                    let y = (x * 0.15 + time).sin() * (z * 0.15 + time).cos() * 3.5 - 4.0;
                    (x, y, z)
                }
                2 => {
                    // Tunnel
                    let norm = i_f / p_count_f;
                    let angle = norm * PI * 40.0;
                    let z = (norm - 0.5) * 80.0;
                    let r = 12.0 + (angle * 2.0 + time * 2.0).sin() * 1.0;
                    let a = angle + time * 0.2;
                    (r * a.cos(), r * a.sin(), z)
                }
                3 => {
                    // Spiderweb
                    let num_spokes = 16usize;
                    let spoke = (i % num_spokes) as f32;
                    let ring = (i / num_spokes) as f32;
                    let angle = (spoke / 16.0) * PI * 2.0 + ring * 0.035;
                    let base_radius = 9.0 + ring * 1.55;
                    let r = base_radius + (time * 1.5 + ring * 0.4).sin() * 0.2;
                    let z_offset = -base_radius.powf(1.05) * 0.12;
                    let a = angle + time * 0.05;
                    (
                        r * a.cos(),
                        r * a.sin(),
                        z_offset + (time * 0.5 + spoke).cos() * 0.5,
                    )
                }
                4 => {
                    // Gravity
                    let norm = i_f / p_count_f;
                    let r = norm.powf(2.5) * 32.0 + 0.8;
                    let t_val = norm * PI * 10.0;
                    let speed = 2.0 / (r * 0.08 + 0.3);
                    let a = t_val + time * speed;
                    (
                        r * a.cos(),
                        (t_val * 2.0 + time).sin() * 0.4 - 10.0 / (r + 1.5),
                        r * a.sin(),
                    )
                }
                5 => {
                    // Network
                    let layers = 5usize;
                    let nodes_per_layer = (p_count / layers).max(1);
                    let layer_index = i / nodes_per_layer;
                    let node_index = i % nodes_per_layer;
                    let z_offset = (layer_index as f32 - 2.0) * 12.0;
                    let angle = (node_index as f32 / nodes_per_layer as f32) * PI * 2.0;
                    let extra_r = if layer_index == 2 {
                        5.0
                    } else if layer_index == 1 || layer_index == 3 {
                        3.0
                    } else {
                        0.0
                    };
                    let r = 7.0 + extra_r + (angle * 3.0 + time).sin() * 0.8;
                    (
                        r * angle.cos(),
                        r * angle.sin(),
                        z_offset + (angle * 2.0 + time).cos() * 1.5,
                    )
                }
                _ => {
                    // Agent
                    let seed_x = (i_f * 1.45).sin();
                    let seed_y = (i_f * 2.87).cos();
                    let seed_z = (i_f * 4.12).sin();
                    (
                        seed_x * 34.0 + (time * 0.2 + i_f * 0.05).sin() * 3.5,
                        seed_y * 20.0 + (time * 0.25 + i_f * 0.05).cos() * 2.5,
                        seed_z * 15.0 + (time * 0.15 + i_f * 0.03).sin() * 4.0,
                    )
                }
            };

            let idx = i * 3;
            STATE.node_positions[idx] += (tx - STATE.node_positions[idx]) * 0.06;
            STATE.node_positions[idx + 1] += (ty - STATE.node_positions[idx + 1]) * 0.06;
            STATE.node_positions[idx + 2] += (tz - STATE.node_positions[idx + 2]) * 0.06;

            STATE.node_colors[idx] += (target_r - STATE.node_colors[idx]) * 0.05;
            STATE.node_colors[idx + 1] += (target_g - STATE.node_colors[idx + 1]) * 0.05;
            STATE.node_colors[idx + 2] += (target_b - STATE.node_colors[idx + 2]) * 0.05;
        }

        // 2. Update Wandering Agent Hubs
        for a in 0..a_count {
            let a_idx = a * 3;
            let t_idx = STATE.agent_targets[a] * 3;
            let speed = STATE.agent_speeds[a];

            let tx = STATE.node_positions[t_idx];
            let ty = STATE.node_positions[t_idx + 1];
            let tz = STATE.node_positions[t_idx + 2];

            let ax = STATE.agent_positions[a_idx] + (tx - STATE.agent_positions[a_idx]) * speed;
            let ay =
                STATE.agent_positions[a_idx + 1] + (ty - STATE.agent_positions[a_idx + 1]) * speed;
            let az =
                STATE.agent_positions[a_idx + 2] + (tz - STATE.agent_positions[a_idx + 2]) * speed;

            STATE.agent_positions[a_idx] = ax;
            STATE.agent_positions[a_idx + 1] = ay;
            STATE.agent_positions[a_idx + 2] = az;

            let pulse = 1.0 + (time * 6.0 + a as f32).sin() * 0.3;
            let cr = ag_base_r * pulse;
            let cg = ag_base_g * pulse;
            let cb = ag_base_b * pulse;

            STATE.agent_colors[a_idx] += (cr - STATE.agent_colors[a_idx]) * 0.1;
            STATE.agent_colors[a_idx + 1] += (cg - STATE.agent_colors[a_idx + 1]) * 0.1;
            STATE.agent_colors[a_idx + 2] += (cb - STATE.agent_colors[a_idx + 2]) * 0.1;

            let dx = ax - tx;
            let dy = ay - ty;
            let dz = az - tz;
            if dx * dx + dy * dy + dz * dz < 1.0 {
                STATE.agent_targets[a] = (STATE.rng.next_u32() as usize) % p_count;
                STATE.agent_speeds[a] = 0.015 + STATE.rng.next_f32() * 0.025;
            }
        }

        // 3. Build Constellation Line Segments (Squared-Distance Fast Reject)
        let max_dist = mode_connection_distance(mode);
        let max_dist_sq = max_dist * max_dist;
        let inv_max_dist = 1.0 / max_dist;

        let agent_max_dist = max_dist * 1.5;
        let agent_max_dist_sq = agent_max_dist * agent_max_dist;
        let inv_agent_max_dist = 1.0 / agent_max_dist;

        let mut line_idx = 0usize;

        for i in 0..p_count {
            if line_idx >= max_conn {
                break;
            }
            let i3 = i * 3;
            let p1x = STATE.node_positions[i3];
            let p1y = STATE.node_positions[i3 + 1];
            let p1z = STATE.node_positions[i3 + 2];
            let c1r = STATE.node_colors[i3];
            let c1g = STATE.node_colors[i3 + 1];
            let c1b = STATE.node_colors[i3 + 2];

            let limit = (i + 15).min(p_count);
            for j in (i + 1)..limit {
                if line_idx >= max_conn {
                    break;
                }
                let j3 = j * 3;
                let dx = p1x - STATE.node_positions[j3];
                let dy = p1y - STATE.node_positions[j3 + 1];
                let dz = p1z - STATE.node_positions[j3 + 2];
                let dist_sq = dx * dx + dy * dy + dz * dz;

                if dist_sq < max_dist_sq {
                    let dist = dist_sq.sqrt();
                    let alpha = (1.0 - dist * inv_max_dist) * 0.42;
                    let base = line_idx * 6;

                    STATE.line_positions[base] = p1x;
                    STATE.line_positions[base + 1] = p1y;
                    STATE.line_positions[base + 2] = p1z;
                    STATE.line_positions[base + 3] = STATE.node_positions[j3];
                    STATE.line_positions[base + 4] = STATE.node_positions[j3 + 1];
                    STATE.line_positions[base + 5] = STATE.node_positions[j3 + 2];

                    STATE.line_colors[base] = c1r * alpha;
                    STATE.line_colors[base + 1] = c1g * alpha;
                    STATE.line_colors[base + 2] = c1b * alpha;
                    STATE.line_colors[base + 3] = STATE.node_colors[j3] * alpha;
                    STATE.line_colors[base + 4] = STATE.node_colors[j3 + 1] * alpha;
                    STATE.line_colors[base + 5] = STATE.node_colors[j3 + 2] * alpha;

                    line_idx += 1;
                }
            }

            for a in 0..a_count {
                if line_idx >= max_conn {
                    break;
                }
                let a3 = a * 3;
                let ax = STATE.agent_positions[a3];
                let ay = STATE.agent_positions[a3 + 1];
                let az = STATE.agent_positions[a3 + 2];
                let dx = ax - p1x;
                let dy = ay - p1y;
                let dz = az - p1z;
                let dist_sq = dx * dx + dy * dy + dz * dz;

                if dist_sq < agent_max_dist_sq {
                    let dist = dist_sq.sqrt();
                    let alpha = (1.0 - dist * inv_agent_max_dist) * 0.72;
                    let base = line_idx * 6;

                    STATE.line_positions[base] = ax;
                    STATE.line_positions[base + 1] = ay;
                    STATE.line_positions[base + 2] = az;
                    STATE.line_positions[base + 3] = p1x;
                    STATE.line_positions[base + 4] = p1y;
                    STATE.line_positions[base + 5] = p1z;

                    STATE.line_colors[base] = STATE.agent_colors[a3] * alpha;
                    STATE.line_colors[base + 1] = STATE.agent_colors[a3 + 1] * alpha;
                    STATE.line_colors[base + 2] = STATE.agent_colors[a3 + 2] * alpha;
                    STATE.line_colors[base + 3] = c1r * alpha;
                    STATE.line_colors[base + 4] = c1g * alpha;
                    STATE.line_colors[base + 5] = c1b * alpha;

                    line_idx += 1;
                }
            }
        }

        STATE.active_line_vertices = line_idx * 2;
        STATE.active_line_vertices
    }
}

#[no_mangle]
pub extern "C" fn get_node_positions_ptr() -> *const f32 {
    unsafe { STATE.node_positions.as_ptr() }
}

#[no_mangle]
pub extern "C" fn get_node_colors_ptr() -> *const f32 {
    unsafe { STATE.node_colors.as_ptr() }
}

#[no_mangle]
pub extern "C" fn get_agent_positions_ptr() -> *const f32 {
    unsafe { STATE.agent_positions.as_ptr() }
}

#[no_mangle]
pub extern "C" fn get_agent_colors_ptr() -> *const f32 {
    unsafe { STATE.agent_colors.as_ptr() }
}

#[no_mangle]
pub extern "C" fn get_line_positions_ptr() -> *const f32 {
    unsafe { STATE.line_positions.as_ptr() }
}

#[no_mangle]
pub extern "C" fn get_line_colors_ptr() -> *const f32 {
    unsafe { STATE.line_colors.as_ptr() }
}
