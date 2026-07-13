const adminService = require("../services/admin.service");

const getDashboardStats = async (req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const acknowledgeSOS = async (req, res) => {
    try {
        const io = req.app.get("io");
        const emergencyId = req.params.id;
        const result = await adminService.acknowledgeSOS(emergencyId, io);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const resolveSOS = async (req, res) => {
    try {
        const io = req.app.get("io");
        const emergencyId = req.params.id;
        const result = await adminService.resolveSOS(emergencyId, io);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getDashboardStats, acknowledgeSOS, resolveSOS };
