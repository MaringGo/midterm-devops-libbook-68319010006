<template>
  <div class="app-wrapper" :data-theme="theme">

    <!-- ===== SIDEBAR ===== -->
    <aside class="sidebar">
      <div class="brand">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">libbook</span>
          <span class="brand-sub">Library System</span>
        </div>
      </div>

      <!-- Student info card -->
      <div class="student-card">
        <div class="student-card-label">ผู้สอบกลางภาค</div>
        <div class="student-name">นายชลิต กำแก้ว</div>
        <div class="student-id">รหัส: 68319010006</div>
      </div>

      <nav class="nav-links">
        <a href="#" class="nav-link active">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
            <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
          </svg>
          ทะเบียนหนังสือ
        </a>
        <a href="https://github.com/MaringGo/midterm-devops-libbook-68319010006" target="_blank" class="nav-link">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          GitHub
        </a>
      </nav>

      <div class="sidebar-bottom">
        <button class="theme-btn" @click="toggleTheme">
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          {{ theme === 'dark' ? 'โหมดกลางวัน' : 'โหมดกลางคืน' }}
        </button>
      </div>
    </aside>

    <!-- ===== MAIN CONTENT ===== -->
    <main class="main">

      <!-- Topbar -->
      <header class="topbar">
        <div>
          <h1 class="page-title">ระบบทะเบียนหนังสือห้องสมุดวิทยาลัย</h1>
          <p class="page-sub">ระบบบันทึก ตรวจสอบ และบริหารสถานะหนังสือด้วย PostgreSQL + Vue 3</p>
        </div>
        <div class="profile-chip">
          <div class="profile-avatar">CK</div>
          <div class="profile-info">
            <span class="profile-name">นายชลิต กำแก้ว</span>
            <span class="profile-id">68319010006</span>
          </div>
        </div>
      </header>

      <!-- Stats Cards -->
      <section class="stats-row">
        <div class="stat-card total">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <div>
            <div class="stat-label">หนังสือทั้งหมด</div>
            <div class="stat-num">{{ stats.total }}</div>
            <div class="stat-desc">รายการในฐานข้อมูล</div>
          </div>
        </div>
        <div class="stat-card available">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <div class="stat-label">พร้อมให้ยืม</div>
            <div class="stat-num">{{ stats.available }}</div>
            <div class="stat-desc">สถานะปกติ</div>
          </div>
        </div>
        <div class="stat-card borrowed">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          <div>
            <div class="stat-label">ถูกยืมไป</div>
            <div class="stat-num">{{ stats.borrowed }}</div>
            <div class="stat-desc">อยู่ระหว่างยืมคืน</div>
          </div>
        </div>
        <div class="stat-card damaged">
          <div class="stat-icon-wrap">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <div class="stat-label">ชำรุดเสียหาย</div>
            <div class="stat-num">{{ stats.damaged }}</div>
            <div class="stat-desc">รอส่งซ่อม</div>
          </div>
        </div>
      </section>

      <!-- Table Panel -->
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">รายการหนังสือในระบบ</h2>
            <p class="panel-sub">เชื่อมต่อ API Backend + PostgreSQL</p>
          </div>
          <button class="btn btn-primary" @click="openAddModal">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            เพิ่มหนังสือใหม่
          </button>
        </div>

        <!-- Filters -->
        <div class="filter-row">
          <div class="search-wrap">
            <svg class="search-ico" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input v-model="searchQ" @input="onFilter" class="input search-input" placeholder="ค้นหา ISBN, ชื่อหนังสือ, ผู้แต่ง...">
          </div>
          <div class="filter-chips">
            <select v-model="filterCat" @change="onFilter" class="select-input">
              <option value="all">หมวดหมู่ทั้งหมด</option>
              <option value="เทคโนโลยีและคอมพิวเตอร์">เทคโนโลยีและคอมพิวเตอร์</option>
              <option value="วิทยาศาสตร์และคณิตศาสตร์">วิทยาศาสตร์และคณิตศาสตร์</option>
              <option value="วรรณกรรมและนิยาย">วรรณกรรมและนิยาย</option>
              <option value="ประวัติศาสตร์และสังคม">ประวัติศาสตร์และสังคม</option>
              <option value="วิศวกรรมและการแพทย์">วิศวกรรมและการแพทย์</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
            <select v-model="filterStatus" @change="onFilter" class="select-input">
              <option value="all">สถานะทั้งหมด</option>
              <option value="พร้อมให้ยืม">พร้อมให้ยืม</option>
              <option value="ถูกยืม">ถูกยืม</option>
              <option value="ชำรุด">ชำรุด</option>
            </select>
            <select v-model="sortBy" @change="onFilter" class="select-input">
              <option value="newest">บันทึกล่าสุด</option>
              <option value="isbn">เรียงตาม ISBN</option>
              <option value="title">เรียงตามชื่อ</option>
              <option value="year-desc">ปีใหม่ → เก่า</option>
              <option value="year-asc">ปีเก่า → ใหม่</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="table-wrap">
          <table v-if="books.length > 0" class="data-table">
            <thead>
              <tr>
                <th>เลขทะเบียน/ISBN</th>
                <th>ชื่อหนังสือ</th>
                <th>ผู้แต่ง</th>
                <th>หมวดหมู่</th>
                <th>ปีที่พิมพ์</th>
                <th>สถานะ</th>
                <th style="text-align:right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in paginatedBooks" :key="book.isbn" class="table-row">
                <td class="isbn-cell">{{ book.isbn }}</td>
                <td class="title-cell" :title="book.title">{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td><span class="cat-text">{{ book.category }}</span></td>
                <td>{{ book.year }}</td>
                <td>
                  <span class="badge" :class="statusClass(book.status)">
                    <span class="badge-dot"></span>{{ book.status }}
                  </span>
                </td>
                <td>
                  <div class="action-cell">
                    <button class="icon-btn edit" @click="openEditModal(book)" title="แก้ไข">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button class="icon-btn del" @click="openDeleteModal(book)" title="ลบ">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-else class="empty-state">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <h3>ไม่พบข้อมูลหนังสือ</h3>
            <p>ลองเปลี่ยนตัวกรองหรือเพิ่มหนังสือใหม่เข้าสู่ระบบ</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-row">
          <span class="page-info">แสดง {{ pageStart }}–{{ pageEnd }} จาก {{ books.length }} รายการ</span>
          <div class="page-btns">
            <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">«</button>
            <button
              v-for="p in totalPages" :key="p"
              class="page-btn" :class="{ active: p === currentPage }"
              @click="currentPage = p"
            >{{ p }}</button>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">»</button>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== ADD MODAL ===== -->
    <Teleport to="body">
      <div class="overlay" :class="{ open: showAdd }" @click.self="showAdd = false">
        <div class="modal">
          <div class="modal-header">
            <h3>เพิ่มทะเบียนหนังสือใหม่</h3>
            <button class="close-btn" @click="showAdd = false">&times;</button>
          </div>
          <form @submit.prevent="submitAdd">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field" :class="{ invalid: errors.isbn }">
                  <label>เลขทะเบียน / ISBN <span class="req">*</span></label>
                  <input v-model="form.isbn" class="input" placeholder="10 หรือ 13 หลัก">
                  <span class="err-msg">{{ errors.isbn }}</span>
                </div>
                <div class="form-field" :class="{ invalid: errors.year }">
                  <label>ปีที่พิมพ์ <span class="req">*</span></label>
                  <input v-model="form.year" type="number" class="input" placeholder="เช่น 2568">
                  <span class="err-msg">{{ errors.year }}</span>
                </div>
                <div class="form-field col-2" :class="{ invalid: errors.title }">
                  <label>ชื่อหนังสือ <span class="req">*</span></label>
                  <input v-model="form.title" class="input" placeholder="ชื่อเรื่องเต็มของหนังสือ">
                  <span class="err-msg">{{ errors.title }}</span>
                </div>
                <div class="form-field" :class="{ invalid: errors.author }">
                  <label>ผู้แต่ง <span class="req">*</span></label>
                  <input v-model="form.author" class="input" placeholder="ชื่อผู้แต่งหลัก">
                  <span class="err-msg">{{ errors.author }}</span>
                </div>
                <div class="form-field" :class="{ invalid: errors.category }">
                  <label>หมวดหมู่ <span class="req">*</span></label>
                  <select v-model="form.category" class="input">
                    <option value="" disabled>เลือกหมวดหมู่</option>
                    <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                  </select>
                  <span class="err-msg">{{ errors.category }}</span>
                </div>
                <div class="form-field col-2">
                  <label>สถานะ <span class="req">*</span></label>
                  <div class="radio-row">
                    <label class="radio-opt" v-for="s in statuses" :key="s">
                      <input type="radio" :value="s" v-model="form.status">
                      <span class="radio-circle" :class="radioClass(s)"></span>
                      {{ s }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showAdd = false">ยกเลิก</button>
              <button type="submit" class="btn btn-primary">บันทึกข้อมูล</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ===== EDIT MODAL ===== -->
    <Teleport to="body">
      <div class="overlay" :class="{ open: showEdit }" @click.self="showEdit = false">
        <div class="modal">
          <div class="modal-header">
            <h3>แก้ไขข้อมูลหนังสือ</h3>
            <button class="close-btn" @click="showEdit = false">&times;</button>
          </div>
          <form @submit.prevent="submitEdit">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field">
                  <label>เลขทะเบียน / ISBN</label>
                  <input :value="editForm.isbn" class="input disabled-input" disabled>
                </div>
                <div class="form-field" :class="{ invalid: editErrors.year }">
                  <label>ปีที่พิมพ์ <span class="req">*</span></label>
                  <input v-model="editForm.year" type="number" class="input" placeholder="เช่น 2568">
                  <span class="err-msg">{{ editErrors.year }}</span>
                </div>
                <div class="form-field col-2" :class="{ invalid: editErrors.title }">
                  <label>ชื่อหนังสือ <span class="req">*</span></label>
                  <input v-model="editForm.title" class="input" placeholder="ชื่อเรื่องเต็มของหนังสือ">
                  <span class="err-msg">{{ editErrors.title }}</span>
                </div>
                <div class="form-field" :class="{ invalid: editErrors.author }">
                  <label>ผู้แต่ง <span class="req">*</span></label>
                  <input v-model="editForm.author" class="input" placeholder="ชื่อผู้แต่งหลัก">
                  <span class="err-msg">{{ editErrors.author }}</span>
                </div>
                <div class="form-field" :class="{ invalid: editErrors.category }">
                  <label>หมวดหมู่ <span class="req">*</span></label>
                  <select v-model="editForm.category" class="input">
                    <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                  </select>
                  <span class="err-msg">{{ editErrors.category }}</span>
                </div>
                <div class="form-field col-2">
                  <label>สถานะ <span class="req">*</span></label>
                  <div class="radio-row">
                    <label class="radio-opt" v-for="s in statuses" :key="s">
                      <input type="radio" :value="s" v-model="editForm.status">
                      <span class="radio-circle" :class="radioClass(s)"></span>
                      {{ s }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showEdit = false">ยกเลิก</button>
              <button type="submit" class="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ===== DELETE CONFIRM MODAL ===== -->
    <Teleport to="body">
      <div class="overlay" :class="{ open: showDelete }" @click.self="showDelete = false">
        <div class="modal modal-sm">
          <div class="modal-header">
            <h3>ยืนยันการลบข้อมูล</h3>
            <button class="close-btn" @click="showDelete = false">&times;</button>
          </div>
          <div class="modal-body" style="text-align:center">
            <div class="del-icon">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </div>
            <h4>ต้องการลบหนังสือเล่มนี้?</h4>
            <p class="del-desc">คุณกำลังจะลบ <strong>"{{ deleteTarget?.title }}"</strong> ออกจากระบบอย่างถาวร</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showDelete = false">ยกเลิก</button>
            <button class="btn btn-danger" @click="confirmDelete">ลบข้อมูล</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ===== TOAST NOTIFICATIONS ===== -->
    <div class="toast-stack">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="`toast-${t.type}`">
        <svg v-if="t.type === 'success'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <svg v-else-if="t.type === 'error'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span>{{ t.message }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ===== CONSTANTS =====
const categories = [
  'เทคโนโลยีและคอมพิวเตอร์', 'วิทยาศาสตร์และคณิตศาสตร์',
  'วรรณกรรมและนิยาย', 'ประวัติศาสตร์และสังคม',
  'วิศวกรรมและการแพทย์', 'อื่นๆ'
]
const statuses = ['พร้อมให้ยืม', 'ถูกยืม', 'ชำรุด']
const PER_PAGE = 5

// ===== STATE =====
const theme = ref(localStorage.getItem('libbook_theme') || 'dark')
const books = ref([])
const toasts = ref([])
const currentPage = ref(1)

// Filters
const searchQ = ref('')
const filterCat = ref('all')
const filterStatus = ref('all')
const sortBy = ref('newest')

// Modals
const showAdd = ref(false)
const showEdit = ref(false)
const showDelete = ref(false)
const deleteTarget = ref(null)

// Forms
const blankForm = () => ({ isbn: '', title: '', author: '', category: '', year: '', status: 'พร้อมให้ยืม' })
const form = ref(blankForm())
const editForm = ref(blankForm())
const errors = ref({})
const editErrors = ref({})

// ===== COMPUTED =====
const stats = computed(() => ({
  total: books.value.length,
  available: books.value.filter(b => b.status === 'พร้อมให้ยืม').length,
  borrowed: books.value.filter(b => b.status === 'ถูกยืม').length,
  damaged: books.value.filter(b => b.status === 'ชำรุด').length
}))

const totalPages = computed(() => Math.max(1, Math.ceil(books.value.length / PER_PAGE)))

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return books.value.slice(start, start + PER_PAGE)
})

const pageStart = computed(() => books.value.length === 0 ? 0 : (currentPage.value - 1) * PER_PAGE + 1)
const pageEnd = computed(() => Math.min(currentPage.value * PER_PAGE, books.value.length))

// ===== HELPERS =====
function toggleTheme () {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('libbook_theme', theme.value)
  toast(`เปลี่ยนเป็น${theme.value === 'dark' ? 'โหมดกลางคืน' : 'โหมดกลางวัน'}`, 'info')
}

function toast (message, type = 'success') {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3500)
}

function statusClass (s) {
  if (s === 'พร้อมให้ยืม') return 'badge-ready'
  if (s === 'ถูกยืม') return 'badge-borrowed'
  return 'badge-damaged'
}

function radioClass (s) {
  if (s === 'พร้อมให้ยืม') return 'radio-ready'
  if (s === 'ถูกยืม') return 'radio-borrowed'
  return 'radio-damaged'
}

function cleanISBN (isbn) { return isbn.replace(/[-\s]/g, '') }

function isValidYear (y) {
  const year = parseInt(y, 10)
  if (isNaN(year)) return false
  const ceCurrent = new Date().getFullYear()
  return (year > 2300 ? year >= 2400 && year <= ceCurrent + 544 : year >= 1800 && year <= ceCurrent + 1)
}

// ===== API HELPERS =====
async function fetchBooks () {
  const params = new URLSearchParams()
  if (searchQ.value) params.append('search', searchQ.value)
  if (filterCat.value !== 'all') params.append('category', filterCat.value)
  if (filterStatus.value !== 'all') params.append('status', filterStatus.value)
  params.append('sortBy', sortBy.value)

  try {
    const res = await fetch(`/api/books?${params}`)
    if (!res.ok) throw new Error()
    books.value = await res.json()
    currentPage.value = 1
  } catch {
    toast('ไม่สามารถเชื่อมต่อ API ได้', 'error')
  }
}

function onFilter () { fetchBooks() }

// ===== VALIDATION =====
function validateForm (f, errs) {
  errs.value = {}
  const cleaned = cleanISBN(f.isbn || '')
  if (!f.isbn) errs.value.isbn = 'กรุณากรอก ISBN'
  else if (cleaned.length !== 10 && cleaned.length !== 13) errs.value.isbn = 'ISBN ต้องมี 10 หรือ 13 หลัก'
  if (!f.title) errs.value.title = 'กรุณากรอกชื่อหนังสือ'
  if (!f.author) errs.value.author = 'กรุณากรอกชื่อผู้แต่ง'
  if (!f.category) errs.value.category = 'กรุณาเลือกหมวดหมู่'
  if (!isValidYear(f.year)) errs.value.year = 'ปีที่พิมพ์ไม่ถูกต้อง'
  return Object.keys(errs.value).length === 0
}

// ===== CRUD OPERATIONS =====
function openAddModal () {
  form.value = blankForm()
  errors.value = {}
  showAdd.value = true
}

async function submitAdd () {
  if (!validateForm(form.value, errors)) return
  try {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form.value, year: parseInt(form.value.year) })
    })
    const data = await res.json()
    if (!res.ok) {
      if (data.error?.includes('ISBN') || data.error?.includes('ทะเบียน')) {
        errors.value.isbn = data.error
      }
      throw new Error(data.error)
    }
    showAdd.value = false
    await fetchBooks()
    toast(`เพิ่มหนังสือ "${form.value.title}" เรียบร้อย!`)
  } catch (e) {
    toast(e.message || 'เกิดข้อผิดพลาด', 'error')
  }
}

function openEditModal (book) {
  editForm.value = { ...book, year: String(book.year) }
  editErrors.value = {}
  showEdit.value = true
}

async function submitEdit () {
  const ef = { ...editForm.value }
  // Skip ISBN validation for edit
  const tempErr = ref({})
  if (!ef.title) tempErr.value.title = 'กรุณากรอกชื่อหนังสือ'
  if (!ef.author) tempErr.value.author = 'กรุณากรอกชื่อผู้แต่ง'
  if (!ef.category) tempErr.value.category = 'กรุณาเลือกหมวดหมู่'
  if (!isValidYear(ef.year)) tempErr.value.year = 'ปีที่พิมพ์ไม่ถูกต้อง'
  editErrors.value = tempErr.value
  if (Object.keys(tempErr.value).length > 0) return

  try {
    const res = await fetch(`/api/books/${ef.isbn}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: ef.title, author: ef.author, category: ef.category, year: parseInt(ef.year), status: ef.status })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    showEdit.value = false
    await fetchBooks()
    toast(`แก้ไขข้อมูล "${ef.title}" เรียบร้อย!`)
  } catch (e) {
    toast(e.message || 'เกิดข้อผิดพลาด', 'error')
  }
}

function openDeleteModal (book) {
  deleteTarget.value = book
  showDelete.value = true
}

async function confirmDelete () {
  try {
    const res = await fetch(`/api/books/${deleteTarget.value.isbn}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    showDelete.value = false
    await fetchBooks()
    toast('ลบข้อมูลหนังสือเรียบร้อยแล้ว', 'info')
  } catch (e) {
    toast(e.message || 'เกิดข้อผิดพลาด', 'error')
  }
}

// ===== INIT =====
onMounted(() => { fetchBooks() })
</script>

<style scoped>
/* ====== ROOT VARS (scoped via data-theme on root div) ====== */
.app-wrapper {
  --bg-1: #0b0f19; --bg-2: #151c2c; --bg-3: #1e293b;
  --border: rgba(148,163,184,0.12);
  --text-1: #f8fafc; --text-2: #94a3b8; --text-3: #64748b;
  --primary: #6366f1; --primary-h: #4f46e5; --primary-glow: rgba(99,102,241,.3);
  --accent: #0ea5e9;
  --ready: #4ade80; --ready-bg: rgba(74,222,128,.1);
  --borrowed: #fbbf24; --borrowed-bg: rgba(251,191,36,.1);
  --damaged: #f87171; --damaged-bg: rgba(248,113,113,.1);
  --shadow: 0 10px 25px -5px rgba(0,0,0,.5);
  --radius: 12px; --radius-lg: 20px; --radius-full: 9999px;
  --transition: 0.22s cubic-bezier(.4,0,.2,1);
  font-family: 'Plus Jakarta Sans','Sarabun',sans-serif;
  display: flex; width: 100vw; min-height: 100vh;
  background: var(--bg-1); color: var(--text-1);
  transition: background var(--transition), color var(--transition);
}
.app-wrapper[data-theme='light'] {
  --bg-1: #f8fafc; --bg-2: #ffffff; --bg-3: #f1f5f9;
  --border: rgba(15,23,42,.08);
  --text-1: #0f172a; --text-2: #475569; --text-3: #94a3b8;
  --primary: #4f46e5; --primary-h: #3730a3; --primary-glow: rgba(79,70,229,.2);
  --accent: #0284c7;
  --ready: #15803d; --ready-bg: #f0fdf4;
  --borrowed: #b45309; --borrowed-bg: #fef3c7;
  --damaged: #b91c1c; --damaged-bg: #fef2f2;
  --shadow: 0 8px 20px -5px rgba(15,23,42,.1);
}

/* ====== LAYOUT ====== */
.sidebar {
  width: 255px; flex-shrink: 0;
  background: var(--bg-2); border-right: 1px solid var(--border);
  padding: 28px 20px; display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh;
  transition: background var(--transition);
}
.main { flex: 1; padding: 36px 40px; overflow-x: hidden; }

/* ====== BRAND ====== */
.brand { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.logo-icon {
  width: 42px; height: 42px; border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex; align-items: center; justify-content: center; color: #fff;
  box-shadow: 0 4px 14px var(--primary-glow);
}
.brand-text { display: flex; flex-direction: column; }
.brand-name {
  font-size: 1.2rem; font-weight: 800; letter-spacing: 0.5px;
  background: linear-gradient(to right, var(--text-1), var(--text-2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.brand-sub { font-size: 0.7rem; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: 1px; }

/* ====== STUDENT CARD ====== */
.student-card {
  background: linear-gradient(135deg, rgba(99,102,241,.08), rgba(14,165,233,.03));
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 12px 14px; margin-bottom: 22px;
}
.student-card-label { font-size: .68rem; text-transform: uppercase; color: var(--text-3); font-weight: 700; letter-spacing: .5px; }
.student-name { font-size: .85rem; font-weight: 700; margin-top: 4px; }
.student-id { font-size: .78rem; color: var(--text-2); font-weight: 500; margin-top: 2px; }

/* ====== NAV ====== */
.nav-links { display: flex; flex-direction: column; gap: 6px; flex: 1; }
.nav-link {
  display: flex; align-items: center; gap: 10px; padding: 11px 14px;
  color: var(--text-2); text-decoration: none; font-size: .9rem; font-weight: 500;
  border-radius: var(--radius); transition: all var(--transition);
}
.nav-link:hover { background: var(--bg-3); color: var(--text-1); }
.nav-link.active {
  background: linear-gradient(135deg, rgba(99,102,241,.14), rgba(14,165,233,.05));
  color: var(--primary); border-left: 3px solid var(--primary); font-weight: 600;
  border-top-left-radius: 0; border-bottom-left-radius: 0;
}

/* ====== THEME BTN ====== */
.sidebar-bottom { margin-top: auto; }
.theme-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 11px; background: var(--bg-3); color: var(--text-1);
  border: 1px solid var(--border); border-radius: var(--radius);
  cursor: pointer; font-weight: 600; font-size: .82rem;
  transition: all var(--transition);
}
.theme-btn:hover { border-color: var(--text-3); transform: translateY(-1px); }

/* ====== TOPBAR ====== */
.topbar { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; gap: 16px; }
.page-title { font-size: 1.7rem; font-weight: 800; letter-spacing: -.5px; }
.page-sub { font-size: .9rem; color: var(--text-2); margin-top: 4px; }
.profile-chip {
  display: flex; align-items: center; gap: 10px;
  background: var(--bg-2); border: 1px solid var(--border);
  border-radius: var(--radius-full); padding: 5px 16px 5px 6px;
  flex-shrink: 0;
}
.profile-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #fff; font-weight: 700; font-size: .82rem;
  display: flex; align-items: center; justify-content: center;
}
.profile-info { display: flex; flex-direction: column; }
.profile-name { font-size: .82rem; font-weight: 700; }
.profile-id { font-size: .68rem; color: var(--text-3); }

/* ====== STATS ====== */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
.stat-card {
  background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 22px 20px; display: flex; align-items: center; gap: 16px;
  transition: all var(--transition); box-shadow: 0 2px 8px -2px rgba(0,0,0,.3);
}
.stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); border-color: rgba(99,102,241,.2); }
.stat-icon-wrap {
  width: 50px; height: 50px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.stat-card.total .stat-icon-wrap { background: rgba(99,102,241,.1); color: var(--primary); }
.stat-card.available .stat-icon-wrap { background: rgba(74,222,128,.1); color: #4ade80; }
.stat-card.borrowed .stat-icon-wrap { background: rgba(251,191,36,.1); color: #fbbf24; }
.stat-card.damaged .stat-icon-wrap { background: rgba(248,113,113,.1); color: #f87171; }
.stat-label { font-size: .8rem; color: var(--text-2); font-weight: 600; }
.stat-num { font-size: 1.8rem; font-weight: 800; line-height: 1; margin: 4px 0; }
.stat-desc { font-size: .72rem; color: var(--text-3); }

/* ====== PANEL ====== */
.panel {
  background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 28px; box-shadow: var(--shadow);
}
.panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
.panel-title { font-size: 1.15rem; font-weight: 700; }
.panel-sub { font-size: .82rem; color: var(--text-2); margin-top: 3px; }

/* ====== FILTERS ====== */
.filter-row { display: flex; justify-content: space-between; gap: 14px; margin-bottom: 20px; flex-wrap: wrap; }
.search-wrap { position: relative; flex: 1; min-width: 260px; max-width: 440px; }
.search-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-3); pointer-events: none; }
.filter-chips { display: flex; gap: 10px; flex-wrap: wrap; }
.input {
  width: 100%; padding: 11px 14px; background: var(--bg-3); border: 1px solid var(--border);
  color: var(--text-1); border-radius: var(--radius); font-size: .88rem; outline: none;
  transition: all var(--transition); font-family: inherit;
}
.input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-glow); }
.search-input { padding-left: 42px; }
.select-input {
  appearance: none; background: var(--bg-3); border: 1px solid var(--border);
  color: var(--text-1); padding: 11px 36px 11px 14px; border-radius: var(--radius);
  font-size: .82rem; font-weight: 500; cursor: pointer; outline: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center;
  transition: border-color var(--transition); font-family: inherit;
}
.select-input:focus { border-color: var(--primary); }

/* ====== TABLE ====== */
.table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 20px; }
.data-table { width: 100%; border-collapse: collapse; font-size: .88rem; }
.data-table th {
  background: var(--bg-3); color: var(--text-2); font-weight: 600;
  padding: 14px 18px; border-bottom: 1px solid var(--border); text-align: left;
}
.data-table td { padding: 16px 18px; border-bottom: 1px solid var(--border); font-weight: 500; }
.table-row { transition: background var(--transition); }
.table-row:hover { background: rgba(99,102,241,.03); }
.table-row:last-child td { border-bottom: none; }
.isbn-cell { font-family: monospace; font-weight: 600; color: var(--accent); letter-spacing: .4px; }
.title-cell { max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
.cat-text { color: var(--text-2); }
.action-cell { display: flex; justify-content: flex-end; gap: 7px; }

/* ====== BADGES ====== */
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 11px; border-radius: var(--radius-full); font-size: .73rem; font-weight: 700;
}
.badge-dot { width: 6px; height: 6px; border-radius: 50%; }
.badge-ready { color: var(--ready); background: var(--ready-bg); }
.badge-ready .badge-dot { background: #4ade80; }
.badge-borrowed { color: var(--borrowed); background: var(--borrowed-bg); }
.badge-borrowed .badge-dot { background: #fbbf24; }
.badge-damaged { color: var(--damaged); background: var(--damaged-bg); }
.badge-damaged .badge-dot { background: #f87171; }

/* ====== BUTTONS ====== */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 10px 20px; border-radius: var(--radius); font-size: .88rem; font-weight: 600;
  cursor: pointer; transition: all var(--transition); border: none; font-family: inherit;
}
.btn:active { transform: scale(.98); }
.btn-primary { background: var(--primary); color: #fff; box-shadow: 0 4px 14px var(--primary-glow); }
.btn-primary:hover { background: var(--primary-h); }
.btn-secondary { background: var(--bg-3); color: var(--text-1); border: 1px solid var(--border); }
.btn-secondary:hover { border-color: var(--text-3); }
.btn-danger { background: #ef4444; color: #fff; }
.btn-danger:hover { background: #dc2626; }
.icon-btn {
  width: 34px; height: 34px; padding: 0; border-radius: 8px;
  background: var(--bg-3); color: var(--text-2); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all var(--transition);
}
.icon-btn.edit:hover { color: var(--accent); border-color: rgba(14,165,233,.4); background: rgba(14,165,233,.06); }
.icon-btn.del:hover { color: #f87171; border-color: rgba(248,113,113,.4); background: rgba(248,113,113,.06); }

/* ====== PAGINATION ====== */
.pagination-row { display: flex; justify-content: space-between; align-items: center; }
.page-info { font-size: .82rem; color: var(--text-2); }
.page-btns { display: flex; gap: 5px; }
.page-btn {
  width: 34px; height: 34px; border-radius: 8px; font-size: .82rem; font-weight: 600;
  background: var(--bg-3); color: var(--text-1); border: 1px solid var(--border);
  cursor: pointer; transition: all var(--transition); display: flex; align-items: center; justify-content: center;
}
.page-btn:disabled { opacity: .4; cursor: not-allowed; }
.page-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }
.page-btn:not(:disabled):not(.active):hover { background: var(--border); }

/* ====== EMPTY STATE ====== */
.empty-state { padding: 56px 20px; text-align: center; color: var(--text-3); }
.empty-state h3 { font-size: 1.05rem; margin: 12px 0 6px; color: var(--text-2); }
.empty-state p { font-size: .82rem; }

/* ====== MODAL OVERLAY ====== */
.overlay {
  position: fixed; inset: 0; background: rgba(11,15,25,.72); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
  opacity: 0; pointer-events: none; transition: opacity var(--transition);
}
.overlay.open { opacity: 1; pointer-events: auto; }
.modal {
  background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius-lg);
  width: 90%; max-width: 580px; box-shadow: 0 24px 48px -10px rgba(0,0,0,.6);
  transform: translateY(16px); transition: transform var(--transition); overflow: hidden;
}
.overlay.open .modal { transform: translateY(0); }
.modal-sm { max-width: 420px; }
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 22px 24px; border-bottom: 1px solid var(--border);
}
.modal-header h3 { font-size: 1.1rem; font-weight: 700; }
.close-btn { background: none; border: none; color: var(--text-2); font-size: 1.7rem; cursor: pointer; line-height: 1; transition: color var(--transition); }
.close-btn:hover { color: var(--text-1); }
.modal-body { padding: 22px 24px; }
.modal-footer { padding: 18px 24px; border-top: 1px solid var(--border); background: var(--bg-3); display: flex; justify-content: flex-end; gap: 10px; }

/* ====== FORM GRID ====== */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.form-field { display: flex; flex-direction: column; gap: 7px; }
.col-2 { grid-column: span 2; }
.form-field label { font-size: .82rem; font-weight: 600; color: var(--text-2); }
.req { color: #f87171; }
.form-field.invalid .input { border-color: #ef4444; }
.err-msg { font-size: .72rem; color: #f87171; font-weight: 500; display: none; }
.form-field.invalid .err-msg { display: block; }
.disabled-input { opacity: .55; cursor: not-allowed; }

/* ====== RADIO BUTTONS ====== */
.radio-row { display: flex; gap: 18px; margin-top: 4px; }
.radio-opt { display: inline-flex; align-items: center; gap: 8px; font-size: .88rem; font-weight: 500; cursor: pointer; }
.radio-opt input[type="radio"] { display: none; }
.radio-circle { width: 18px; height: 18px; border: 2px solid var(--text-3); border-radius: 50%; position: relative; transition: all var(--transition); }
.radio-circle::after { content: ''; position: absolute; inset: 3px; border-radius: 50%; transform: scale(0); transition: transform var(--transition); }
.radio-opt input:checked + .radio-ready { border-color: #4ade80; }
.radio-opt input:checked + .radio-ready::after { background: #4ade80; transform: scale(1); }
.radio-opt input:checked + .radio-borrowed { border-color: #fbbf24; }
.radio-opt input:checked + .radio-borrowed::after { background: #fbbf24; transform: scale(1); }
.radio-opt input:checked + .radio-damaged { border-color: #f87171; }
.radio-opt input:checked + .radio-damaged::after { background: #f87171; transform: scale(1); }

/* ====== DELETE MODAL ====== */
.del-icon {
  width: 76px; height: 76px; border-radius: 50%;
  background: rgba(239,68,68,.1); color: #f87171;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 18px;
}
.modal-body h4 { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
.del-desc { font-size: .83rem; color: var(--text-2); line-height: 1.55; }

/* ====== TOAST ====== */
.toast-stack { position: fixed; bottom: 22px; right: 22px; display: flex; flex-direction: column; gap: 10px; z-index: 2000; }
.toast {
  background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 14px 18px; display: flex; align-items: center; gap: 10px;
  min-width: 280px; box-shadow: var(--shadow); font-size: .83rem; font-weight: 600;
  animation: slideIn .3s cubic-bezier(.34,1.56,.64,1);
}
.toast-success { border-left: 4px solid #4ade80; }
.toast-success svg { color: #4ade80; }
.toast-error { border-left: 4px solid #f87171; }
.toast-error svg { color: #f87171; }
.toast-info { border-left: 4px solid var(--accent); }
.toast-info svg { color: var(--accent); }

@keyframes slideIn {
  from { transform: translateX(110%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1100px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .app-wrapper { flex-direction: column; }
  .sidebar { width: 100%; height: auto; flex-direction: row; flex-wrap: wrap; padding: 16px 20px; position: static; }
  .student-card { margin-bottom: 0; margin-left: 16px; flex-shrink: 0; }
  .nav-links { flex-direction: row; flex: 1; }
  .sidebar-bottom { margin-top: 0; margin-left: auto; }
  .main { padding: 24px 20px; }
}
@media (max-width: 640px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .col-2 { grid-column: span 1; }
  .filter-row { flex-direction: column; }
  .search-wrap { max-width: 100%; }
}
</style>
